import { combineEpics } from "redux-observable";
import { map, catchError, switchMap } from "rxjs/operators";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { ofType } from "redux-observable";
import {
  AppAction,
  NetRequestAction,
  NetRequestAT,
  NetRequestBeforeAction,
  NetRequestSuccessAT,
  NetRequestFailureAT,
  NetRequestBeforeAT,
  AppStatusType
} from ".";
import Api from "../views/Api";
import store from "../Store";
import { Observable, of } from "rxjs";
import { NetRequestBean } from "./model";
import { AppStatus } from "./data";

export const httpBeforeEpic = (action$: any) => {
  return action$.pipe(
    ofType(NetRequestBeforeAT),
    map((action: any) => {
      return { ...action, type: NetRequestAT };
    })
  );
};
export const fetchEpic = (action$: any) => {
  return action$.pipe(
    ofType(NetRequestAT),
    switchMap((action: NetRequestAction) => {
      const newAction = action;
      return fromPromise(
        createRequest(action.payload)
          .then(res => {
            // const error = new Error();
            // error.name = "2";
            // error.message = "网络出错";
            // throw error;
            return res.json();
          })
          .catch(e => {
            console.log("promise请求失败", action);
            throw new AppStatus(AppStatusType.FAILURE, e.message);
          })
      ).pipe(
        map(res => {
          console.log("epic请求成功", action);
          return {...new AppAction(NetRequestSuccessAT,res,newAction.payload)}
        }),
        catchError((err: Error, caught: Observable<any>) => {
          console.log("epic请求失败", err);
          return of({...new AppAction(NetRequestFailureAT,new AppStatus(AppStatusType.FAILURE,err.message)).setError(false)});
        })
      );
    })
  );
};

//todo 可能有错误
export const createRequest = ({ method, url, params }: any) => {
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
