### 请求库
通过 xhr 或者 fetch 实现网络请求 api
#### 基本功能
- 多种请求方法如 GET POST FETCH PATCH 等等。
- 处理返回值，包装成统一格式的返回值。
#### 上层功能
- 请求重试
- 请求缓存
- 请求幂等
- 请求串行
- 请求并发
#### 解决的痛点
- 已有的请求库或者 API 如 axios fetch vueRequest swr(react)，没有上层功能，或者绑定了某种框架
- 根据项目特点和需求定制化功能
#### 设计思路
首先基于 DIP 的设计模式进行解藕，交给容器来处理依赖
  1. 只定义接口模型，不做具体的实现.根据需求通过抽象类或者接口模式
   ```ts
    // 通过抽象类的方式
    export abstract class Requestor {
      abstract get(): void
      abstract post(): void
    }
    // 或者
    interface Requestor {
      get(): void
      post(): void
    }
   ```
  2. 实现接口，如果用 xhr 或者 fetch 来实现
   ```ts
    export class XhrRequestor extends Requestor {
      get() {
        //具体实现
      }
      post() {
        // 具体实现
      }
    }
    // 或者
    export class FetchRequestor implements Requestor {
      get() {
        //具体实现
      }
      post() {
        // 具体实现
      }
    }
   ```
  3. 使用时
   ```ts
   import {XhrRequestor, FetchRequestor} from './core'
   
   @injectable()
   class XXXApis {
    constructor(xhrClient: XhrRequestor, fetchClient: FetchRequestor) {
      // ...
    }
   }
   ```
#### 生成模板代码
通过编写脚本，根据文档来自动生成请求接口，数据类型定义等等
#### 缓存
- 同样将接口定义和具体实现分开，可以配置多种缓存服务（如 内存、Storage、indexDB、Cookie、PostMessage 等）
- 缓存的键的设计。如 url、header、参数等等都可以用户配置
#### 请求幂等
- 如请求方法、请求头、请求体都一样的话，就判断为重复
#### 请求并发/请求串行
1. 请求并发（等于有限制的 promise.all）
  ```ts
    function multiRequest(urls: string[], maxNum: number) {
      const len = urls.length
      return new Promise((resolve) => {
        const result = []
        const container = []
        function addTask(url, index) {
          container.push(index)
          console.log(`task${url}执行，耗时${url * 1000}s,当前时间${new Date().toLocaleTimeString()}`)
          fetchData(url).then((res) => {
            result[index] = res
            container.splice(container.indexOf(index), 1)
            if (result.length === len && container.length === 0) {
              resolve(result)
            } else if (container.length < maxNum && urls.length) {
              addTask(urls.shift(), i++)
            }
          })
        }
        let i = 0
        while (container.length < maxNum) {
          const url = urls.shift()
          addTask(url, i)
          i ++
        }
      })
    }
  ```
2. 请求串行
