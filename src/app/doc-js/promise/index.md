### 手写 Promise
```ts
// Promise 构造函数参数是一个可执行函数 executor，有两个参数 resolve 和 rejected（可选）
// 有至少以下属性 status (Promise 状态)、value（提供给 onFulfilled 回调函数的参数，等于就是成功的值）、reason（失败的值）
// 在 constructor 中执行 executor(resolve, reject)，需要 try catch 包裹，catch 中调用 reject
// resolve 更改状态未 Fulfilled, reject 更改状态为 Rejected
// then 方法也有两个回调函数参数 onFulfilled 和 onRejected（但是不一定为函数），返回的是一个 Promise
// 由于异步任务执行结束时机并不知道，所以先将回调函数（onFulfilled, onRejected）和返回的promise的 resolve 和 reject 方法存起来为一个 handler 数组。（简单理解为resolve 和 reject 处理返回的这个 promise 的状态），等待 Promise 的状态变更后再执行对应的回调函数。
// 如果 Promise 是一个已完成的状态（处理同步任务），那么就直接去执行 onFulfilled 或者 onRejected 回调函数。
// 当 executor 完成后，执行 resolve 或者 reject 方法时，更改 Promise 的状态，并且赋值 value 或者 status，然后触发回调函数的执行，从 handler 数组中取出 onFulfilled, onRejected, resolve, reject。
//（这部分代码都需要在微任务队列中执行，比如放在 queueMicrotask 中）根据 promise 的状态 status 来决定执行 onFulfilled 还是 onRejected。如果它们是函数，那么就在 try catch 中执行它们，得到的结果通过之前新的 promise 的 resolve 方法处理这个新 promise 的状态， 失败就 reject（这样就实现了链式调用）。如果不是函数，那么就根据当前 promise 的状态来决定调用 resolve 还是 reject。如果是函数并且是一个 promise（是个对象并且有then方法）的话，就调用then方法（data.then(resolve, reject)）
// catch 方法就是 then 方法，第一个参数未空
// all：返回一个新的 promise，循环执行 promise（不是的话就Promise.resolve为一个promise），then 中将结果根据索引位置存起来，并计数 + 1，如果计数等于 promises 长度，就 resolve，失败就直接 reject
// allSettled：分别在每个 promise 的then方法和catch方法中返回对应的状态和值（等于指定了回调函数）。
enum PromiseStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

type CallbackFn = (value: unknown) => void

type FulfilledFn<T> = (value: T) => void

type PromiseHandlers<T> = {
  onFulfilled: FulfilledFn<T>
  onRejected: CallbackFn
  resolve: CallbackFn
  reject: CallbackFn
}

type PromiseExecutor = (resolve: CallbackFn, reject?: CallbackFn) => void

class MyPromise<T> {
  private value: T = undefined
  private reason: unknown = undefined
  private status: PromiseStatus = PromiseStatus.Pending
  private handlers: PromiseHandlers<T>[] = []
  constructor(executor: PromiseExecutor) {
    const resolve = (value: T) => {
      if (this.status === PromiseStatus.Pending) {
        this.status = PromiseStatus.Fulfilled
        this.value = value
        this.runHandlers()
      }
    }
    const reject = (reason: unknown) => {
      if (this.status === PromiseStatus.Pending) {
        this.status = PromiseStatus.Rejected
        this.reason = reason
        this.runHandlers()
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  static isPromiseLike(value) {
    return value && typeof value === 'object' && typeof value.then === 'function'
  }

  private runCallback(callback, resolve, reject) {
    queueMicrotask(() => {
      const result = this.status === PromiseStatus.Fulfilled ? this.value : this.reason
      if (typeof callback === 'function') {
        try {
          const data = callback(result)
          if (MyPromise.isPromiseLike(data)) {
            data.then(resolve, reject)
          } else {
            resolve(data)
          }
        } catch (error) {
          reject(error)
        }
      } else {
        if (this.status === PromiseStatus.Fulfilled) {
          resolve(this.value)
        } else {
          reject(this.reason)
        }
      }
    })
  }

  private runHandlers() {
    if (this.status === PromiseStatus.Pending) {
      return
    }
    while(this.handlers.length > 0) {
      const { onFulfilled, onRejected, resolve, reject} = this.handlers.shift()
      if (this.status === PromiseStatus.Fulfilled) {
        this.runCallback(onFulfilled, resolve, reject)
      } else {
        this.runCallback(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled: FulfilledFn<T>, onRejected?) {
    return new MyPromise((resolve, reject) => {
      this.handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
      this.runHandlers()
    })
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  static resolve(value: unknown) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }
  static reject(value: unknown) {
    return new MyPromise((_, reject) => {
      reject(value)
    })
  }
  static all(promises: MyPromise<any>[]) {
    return new MyPromise((resolve, reject) => {
      const result = []
      let count = 0
      promises.forEach((promise, index) => {
        promise.then((res) => {
          result[index] = res
          count ++
          if (count === promises.length) {
            resolve(result)
          }
        }, reject)
      })
    })
  }

  static race(promises: any[]) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (!MyPromise.isPromiseLike(promise)) {
          resolve(promise)
        }
        promise.then(resolve, reject)
      })
    })
  }

  static allSettled(promises: any[]) {
    return MyPromise.all(promises.map((item) => {
      return item.then((res) => {
        return {
          status: 'fulfilled',
          value: res
        }
      }).catch((err) => {
        return {
          status: 'rejected',
          reason: err
        }
      })
    }))
  }
}
```
### 常见面试题