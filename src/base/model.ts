import { Action } from "redux";

//规定Action 应该具有的属性 https://github.com/redux-utilities/flux-standard-action
class AppAction<T> implements Action<String> {
  type: string; // action的类型必传
  payload?: T; // action的数据 ,当error 为true的时候 payload 会携带一个额外的数据
  meta?: any; // action的额外数据
  error: any = false; // 判断一个action是否为异常action
  constructor(type: string, payload?: T, meta?: any) {
    this.type = type;
    this.payload = payload;
    this.meta = meta;
  }

  setError = (error: boolean) => {
    this.error = error;
    return this;
  };
}

// 网络请求actionType
const NetRequestAT = "APP/NetRequestActionType";

class NetRequestAction extends AppAction<NetRequestBean> {
  constructor(payload?: NetRequestBean, meta?: any) {
    super(NetRequestBeforeAT, payload, meta);
  }
}
class NetRequestBean {
  method: string;
  url: string;
  params?: any;
  constructor(method: string, url: string, params?: any) {
    this.method = method;
    this.url = url;
    this.params = params;
  }
}

// 网络请求之前actionType
const NetRequestBeforeAT = "APP/NetRequestBeforeAT";

class NetRequestBeforeAction extends AppAction<boolean> {
  constructor(payload: boolean = true, meta?: any) {
    super(NetRequestBeforeAT, payload, meta);
  }
}
// 网络请求成功actionType
const NetRequestSuccessAT = "APP/NetRequestSuccessAT";
// 网络请求失败actionType
const NetRequestFailureAT = "APP/NetRequestFailureAT";

export {
  AppAction,
  NetRequestAction,
  NetRequestBean,
  NetRequestAT,
  NetRequestBeforeAction,
  NetRequestSuccessAT,
  NetRequestFailureAT,
  NetRequestBeforeAT
};
