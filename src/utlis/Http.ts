import Api from "../views/Api";

export default class HttpUtlis {
  
    static getRequest = (url:string, params: any = null, success: Function, fail: Function | null=null, error: Function | null=null) => {
      if (params) {
        let paramsArray:String[] = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + "=" + params[key]));
        if (url.search(/\?/) === -1) {
          url += "?" + paramsArray.join("&");
        } else {
          url += "&" + paramsArray.join("&");
        }
      }
      // fetch 请求
      fetch(`${Api.serverDomain}${url}`, {
        method: "GET",
        headers: {
         
        }
      })
        .then(response => response.json()) //把response转为json
        .then(responseJson => {
          console.log(responseJson); // 打印返回结果
          if (responseJson.responseCode == 200) {
            // 200为请求成功
            success && success(responseJson.data);
          } else {
            fail && fail(responseJson); //可以处理返回的错误信息
            console.log(responseJson.responseCode);
          }
        })
        .catch(e => {
          console.log(e);
          error && error(e);
        });
    };
  
    static getPost(url:string, params:any, success:Function, fail:Function | null=null, error:Function | null=null) {
      console.log(`${Api.serverDomain}${url}`, JSON.stringify(params));
      let formData=new FormData()
     for (const key in params) {
        formData.append(key, params[key])
      }
      fetch(`${Api.serverDomain}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        body:formData
      })
        .then(response =>{
            console.log("返回值",response)
           return response.json() //把response转为json
        })
        .then(responseJson => {
          // 拿到上面的转好的json
          console.log("2222",responseJson); // 打印返回结果
          // 200为请求成功
         // success && success(responseJson.data);
          if (responseJson.errorCode == 0) {
            // 200为请求成功
            success && success(responseJson.data);
          } else {
            fail && fail(responseJson.msg); //可以处理返回的错误信息
          }
        })
        .catch(e => {
          console.log(e);
          error && error(error);
        });
    }
  
  }
  