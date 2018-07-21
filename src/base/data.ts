// 自定义App内异常信息
class AppStatus implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(name: string = AppStatusType.Success, message: string='') {
    this.name = name;
    this.message = message;
  }
}

enum AppStatusType {
  Success = "1",
  FAILURE = "2"
}

export { AppStatus, AppStatusType };
