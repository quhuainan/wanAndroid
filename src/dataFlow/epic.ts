import { combineEpics } from "redux-observable";
import { map, catchError, switchMap } from "rxjs/operators";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { ofType } from "redux-observable";
import {
  HTTP,
  HttpAction,
  HTTP_BEFORE,
  HTTP_FAILURE,
  HTTP_SUCCESS
} from "./action";
import Api from "../views/Api";
import store from "../Store";
import { Observable, of } from "rxjs";

export const httpBeforeEpic = (action$: any) => {
  return action$.pipe(
    ofType(HTTP_BEFORE),

    map((action: any) => {
      return { ...action, type: HTTP };
    })
  );
};
export const fetchEpic = (action$: any) => {
  return action$.pipe(
    ofType(HTTP),
    switchMap((action: HttpAction) => {
      const newAction = action;
      return fromPromise(
        createRequest(action.method, action.url, action.params)
          .then(res => {
            const error = new Error();
            error.name = "2";
            error.message = "网络出错";
            throw error;
            return res.json();
          })
          .catch(e => {
            console.log("promise请求失败", action);
            const error = new Error();
            error.name = "2";
            error.message = "网络出错";
            throw error;
          })
      ).pipe(
        map(res => {
          console.log("epic请求成功", action);
          return {
            type: HTTP_SUCCESS,
            payload: res,
            meta: newAction.params
          };
        }),
        catchError((err: Error, caught: Observable<any>) => {
          console.log("epic请求失败", action);

          return of({ type: HTTP_FAILURE, payload: err });
        })
      );
    })
  );
};

export const createRequest = (method: string, url: string, params: any) => {
  console.log("创建请求");
  let observable;
  if (method == "GET") {
    if (params) {
      let paramsArray: String[] = [];
      //拼接参数
      Object.keys(params).forEach(key =>
        paramsArray.push(key + "=" + params[key])
      );
      if (url.search(/\?/) === -1) {
        url += "?" + paramsArray.join("&");
      } else {
        url += "&" + paramsArray.join("&");
      }
    }
    // fetch 请求
    return fetch(`${Api.serverDomain}${url}`, {
      method: "GET",
      headers: {}
    });
  } else {
    let formData = new FormData();
    for (const key in params) {
      formData.append(key, params[key]);
    }
    return fetch(`${Api.serverDomain}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });
  }
};

export const rootEpic = combineEpics(httpBeforeEpic, fetchEpic);
