### 严格模式
严格模式下，会强制渲染两次，主要目的
1. 帮助开发者发现不纯的渲染逻辑
    ```tsx
    let externalCounter = 0;

    function ImpureComponent() {
      externalCounter++; // 不纯的操作：修改外部变量
      return <div>External Counter: {externalCounter}</div>;
    }

    function App() {
      return (
        <React.StrictMode>
          <ImpureComponent />
        </React.StrictMode>
      );
    }
    ```

  - 在严格模式下，ImpureComponent 会渲染两次，externalCounter 的值会从 1 变成 2。
  - 这表明渲染逻辑不纯，依赖于外部状态。

2. 检查副作用是否正确清理
   ```tsx
    function EffectComponent() {
        useEffect(() => {
          console.log("Effect ran"); // 副作用逻辑
          const interval = setInterval(() => {
            console.log("Interval tick");
          }, 1000);

          // 忘记清理定时器
        }, []);
        return <div>Check your console!</div>;
    }
    function App() {
      return (
        <React.StrictMode>
          <EffectComponent />
        </React.StrictMode>
      );
    }
   ```

  - 在严格模式下，useEffect 会运行两次，但第一次的定时器未清理，导致内存泄漏。
  - 控制台会打印两次 "Effect ran"，但定时器会重复创建。

3. 识别不稳定的生命周期方法
  - 在类组件中，某些生命周期方法（如 componentWillMount、componentWillReceiveProps）已被标记为不推荐使用，因为它们可能导致不稳定的行为。
4. 模拟并发模式的行为
  - 并发模式下，React 可能会中断、暂停或重新开始渲染。严格模式下故意渲染两次，可以模拟这种行为，帮助开发者提前发现问题。
  
### 时间分片
- React 的并发模式下，任务会被拆分为多个小任务（时间分片）。

- 每个小任务的结果会被计算出来，但不会立即渲染到页面上。

- React 会等待所有任务完成后，才将最终结果一次性提交到 DOM。

- 这种机制确保了渲染的一致性和性能优化。

- 在特殊情况下（如 useDeferredValue 和 startTransition），React 允许部分更新以优化用户体验。

### React 中的闭包场景
React 中闭包的应用场景非常广泛，主要包括：

1. Hooks 的实现（如 useState、useEffect）。
    - 闭包的作用：setState 函数通过闭包访问 state 变量，即使 useState 函数已经执行完毕。
    - 实际实现：React 使用链表结构来管理多个 Hooks，每个 Hook 的状态都保存在闭包中。
    - useState 的函数式更新就更能体现其闭包的应用，即时在非合成时间中，通过 setState((pre) => pre + 1) 函数式更新也能正确获取和更新 state
2. 事件处理函数。
   ```jsx
    function Counter() {
      const [count, setCount] = useState(0);

      const handleClick = () => {
        setCount(count + 1); // 通过闭包访问 `count`
      };

      return <button onClick={handleClick}>Count: {count}</button>;
    }
   ```

   - 闭包的作用：handleClick 函数通过闭包访问 count 状态，即使事件触发时 Counter 函数已经执行完毕。
3. 副作用清理。
    ```jsx
      useEffect(() => {
        const timer = setInterval(() => {
          console.log('Timer tick');
        }, 1000);

        return () => {
          clearInterval(timer); // 通过闭包访问 `timer`
        };
      }, []);
    ```

  - 闭包的作用：清理函数通过闭包访问 timer，即使 useEffect 已经执行完毕。
4. 自定义 Hooks。

5. 函数组件的渲染。

6. 高阶组件（HOC）。

7. Context API。
  - 通过闭包来访问 context
8. 回调函数。
   ```jsx
    function Parent() {
      const [count, setCount] = useState(0);

      const handleChildClick = () => {
        setCount(count + 1); // 通过闭包访问 `count`
      };

      return <Child onClick={handleChildClick} />;
    }

    function Child({ onClick }) {
      return <button onClick={onClick}>Click me</button>;
    }
   ```

9.  Memoization（如 useMemo、useCallback）。
  - React 中的 useMemo 和 useCallback 通过闭包缓存计算结果或函数。
10. Refs（如 useRef）。
  - React 的 useRef 通过闭包保存可变值