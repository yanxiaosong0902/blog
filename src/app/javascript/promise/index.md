### 手写 Promise
```ts
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor() {
    this.status = PENDING
    this.value = null
    this.reason = null
  }
}
```
### 常见面试题