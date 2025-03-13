### Hooks
- 多个 hooks 通过`next`属性形成链表连接在一起
- 在fiber对象中有一个属性fiber.memoizedState指向fiber节点的内存状态. 在function类型的组件中, fiber.memoizedState就指向Hook队列(Hook队列保存了function类型的组件状态). 所以Hook也不能脱离fiber而存在, 它们之间的引用关系如下:
- ![关系](https://images-1306393180.cos.ap-chongqing.myqcloud.com/fiber-hook.png)

#### useState
- setState 是异步的（执行过程是同步的），最终更新状态是异步的。
- setState 可以是直接更新也可以是函数式更新
```tsx
function App() {
  const [count, setCount] = useState(0)
// setCount((v) => v + 1) // 这里的 v 是上一次 count 更新的结果（每一次更新都是闭包），无论是直接更新还是函数式更新，因为都是上一次更新后的闭包
  function handleClick() {
    // setCount(count => count + 1) 函数式更新（preState）=> newState, preState 是之前的状态，可以解决非合成时间或者setTimeout/setInternal的状态不正确的问题。
    setCount(count + 1) // 无效，也是因为闭包，因为每次 click 事件触发的时候都是运行这个函数，但是因为闭包的缘故，这个 count 始终是初始值
  }
  useLayoutEffect(() => {
    document.getElementById('test').addEventListener('click', handleClick)
    return () => removeEventListener('click', handleClick)
  }, []) // 如果在依赖中添加了count, 那么也可以解决上面的问题。

  useEffect(() => {
    setTimeout(() => {
      console.log(count) // 始终是 0，也是因为闭包。
    }, 3000)
  }, [])
  return (
    <div>
      <p id="test">非合成事件或者 setTimeout setInternal 等异步函数</p>
    </div>
  )
}
```
#### useTransition
简单的说就是把任务标记为非紧急的一次更新
```tsx
const App = () => {
  const { isPending, startTransition } = useTransition()
  useEffect(() => {
    startTransition(() => {
      // 耗时任务
    })
  }, [xxx])
}
```
#### useDeferredValue
把 state 延迟生效
```tsx
const App = () => {
  const [count, setCount] = useState(0)
  const debounceCount = useDeferredValue(count) // 跟防抖差不多的意思。比如 count 频繁变化，不会立即更改它以及依赖它的任务，等到合适的时机再把它更新成正确的值。
}
```

#### useSyncExternalStore
- useSyncExternalStore 能够通过强制同步更新数据让 React 组件在 CM 下安全地有效地读取外接数据源。
- 在 Concurrent Mode 下，React 一次渲染会分片执行（以 fiber 为单位），中间可能穿插优先级更高的更新。**假如在高优先级的更新中改变了公共数据（比如 redux 中的数据），那之前低优先的渲染必须要重新开始执行，否则就会出现前后状态不一致的情况**。
- useSyncExternalStore 一般是三方状态管理库使用，我们在日常业务中不需要关注。因为 React 自身的 useState 已经原生的解决的并发特性下的 tear（撕裂）问题。
- useSyncExternalStore 主要对于框架开发者，比如 redux，它在控制状态时可能并非直接使用的 React 的 state，而是自己在外部维护了一个 store 对象，用发布订阅模式实现了数据更新，脱离了 React 的管理，也就无法依靠 React 自动解决撕裂问题。因此 React 对外提供了这样一个 API。

### useLayoutEffect
不同于 useEffect, 在 useLayoutEffect 里面可以访问 dom 节点。

#### useInsertionEffect
类似 useLayoutEffect, 不过暂时无法访问 dom 节点的引用。一般只在 css-in-js 库中使用。一般用于提前注入 style 脚本。
