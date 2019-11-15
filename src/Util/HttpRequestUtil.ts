  export  class HttpClient {
        private serverAddr: string;
      
        constructor(serverAddr: string) {
          this.serverAddr = serverAddr;
        }
      
        public Get(
          url: string,
          data: any,
          isJsonData: boolean,
          callback: NetworkCallback,
          async: boolean
        ) {
          this.Send(url, "GET", data, isJsonData, callback, async,false);
        }
      
        private Send(
          url: string,
          method: string,
          data: any,
          isJsonData: boolean,
          callback: NetworkCallback,
          async: boolean,
          isJosonRequest:boolean,
        ) {
          //创建请求
          var xhr = new XMLHttpRequest();
      
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
              var response = xhr.responseText;
              if (callback) {
                //是否为Json数据
                if (isJsonData) {
                  response = JSON.parse(response);
                }
                callback.Call(1, response);
              }
            }
          };
      
          //出错
          xhr.onerror = function(error) {
            if (callback) {
              callback.Call(0, error);
            }
          };
      
          //超时
          xhr.ontimeout = function() {
            if (callback) {
              callback.Call(0, "Timeout");
            }
          };
      
          var VSCODE_CORS_URL = {
            key: "http://localhost:1337",
            proxy: `${this.serverAddr}`
          };
          //建立连接并发送数据
          xhr.open(
            method,
            `http://localhost:1337/${url+(url.includes("?")?"":"?")}&VSCODE_CORS=`+
              JSON.stringify(VSCODE_CORS_URL),
            true
          );
      
          //Json数据添加头
          if (isJosonRequest) {
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
          }
      
          xhr.send(data); 
        }
      }
      /**
       * 网络请求回调类
       */

    export  class NetworkCallback {
        private object: any;
        private func: any;
      
        /**
         * 网络请求回调类
         * @param func 类
         * @param object  对象（若为空则认定为匿名函数）
         */
        constructor(func: any, object: any = null) {
          this.func = func;
          this.object = object;
        }
      
        /**
         * 调用
         * @param state 状态
         * @param response 数据
         */
        Call(state: number, response: any) {
          if (this.object) {
            this.func.call(this.object, state, response);
          } else {
            this.func(state, response);
          }
        }
      }

