# 常用类型
#### Optional
```ts
// Optional, 指定某些参数是可选的
// 先用 Omit 把不需要的参数 K 去掉, 剩下的都是必选参数
// 然后 用 Pick 把需要的参数 K 选出来, 然后用 Partial 把这些参数变成可选参数
// 最后用 & 连接起来
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```
#### Newable
```ts
/** 类（class） */
// 类型 Newable 是一个函数类型，这个函数类型是一个构造函数
export type Newable<T> = new (...args: any[]) => T;
```