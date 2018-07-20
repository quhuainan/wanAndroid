
//全局错误的异常信息


export class ErrorBean {
  code?: string;
  errorMsg?: string;
  constructor(code: string = "1", errorMsg?: string) {
    this.code = code;
    this.errorMsg = errorMsg;
  }
}
