import { Action } from "redux";

const HTTP_BEFORE = "HTTP_REQUEST";
const HTTP_SUCCESS = "HTTP_SUCCESS";
const HTTP_FAILURE = "HTTP_FAILURE";
const HTTP = "HTTP";
// const Action = (type: string, payload?: any, meta?: any) => ({
//   type: type,
//   payload: payload,
//   meta: meta
// });

//const HttpAction = (params: any) => ({ type: REQUEST, payload: params });
class BaseAction implements Action<String> {
  type: String;
  payload?: any;
  constructor(type: string, payload?: any) {
    this.type = type;
    this.payload = payload;
  }
}

class HttpAction extends BaseAction {
  method: string;
  url: string;
  params?: any;
  constructor(method: string, url: string, params?: any) {
    super(HTTP_BEFORE);
    this.method = method;
    this.url = url;
    this.params = params;
  }
}
export { HTTP_BEFORE, HTTP, HTTP_SUCCESS, HTTP_FAILURE, Action, HttpAction,BaseAction };
