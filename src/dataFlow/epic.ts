import { combineEpics, ActionsObservable } from "redux-observable";
import { map, catchError, switchMap } from "rxjs/operators";
import { Observable, ObservableInput, interval, timer } from "rxjs";
import { of } from "rxjs/internal/observable/of";
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
export const fetchEpic = (action$: any) => {
  console.log("store", store);
  if (store != undefined) {
    store.dispatch({ type: HTTP_BEFORE });
  }
  return action$.pipe(
    ofType(HTTP),
    switchMap((action: HttpAction) => {
      const newAction = action;
      return fromPromise(
        createRequest(action.method, action.url, action.params)
          .then(res => {
            return res.json();
          })
          .catch(e => {
            console.log("请求失败", e);
            return { type: HTTP_FAILURE, payload: e, meta: action.params };
          })
      ).pipe(
        map(res => {
          console.log("返回值", newAction);
          return {
            type: HTTP_SUCCESS,
            payload: res,
            meta: newAction.params
          };
        })
      );
    })
  );
};
// fromPromise<any>(fetchPromise).pipe(
//   map((res: any) => Action(SUCCESS, res.data)),
//   catchError((err: any) => {
//     console.log(err);
//     return of(Action(FAILURE, { err: err.message }));
//   })
// );
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

export const rootEpic = combineEpics(fetchEpic);
