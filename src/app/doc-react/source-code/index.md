### 工作循环
![图解](https://images-1306393180.cos.ap-chongqing.myqcloud.com/workloop.png)
### Lane 车道模型
32 位的二进制变量表示优先级，能够快速分离出单个 task，非常方便
```ts
  // 1) 删除单个task
  batchOfTasks &= ~task;
  // 2) 增加单个task
  batchOfTasks |= task;
  // 3) 比较task是否在group中
  const isTaskIncludedInBatch = (task & batchOfTasks) !== 0;
```
#### LanePriority
#### SchedulerPriority
#### ReactPriorityLevel

### Update & UpdateQueue
```ts
export type Hook = {|
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,
  next: Hook | null,
|};

type Update<S, A> = {|
  lane: Lane,
  action: A,
  eagerReducer: ((S, A) => S) | null,
  eagerState: S | null,
  next: Update<S, A>,
  priority?: ReactPriorityLevel,
|};

type UpdateQueue<S, A> = {|
  pending: Update<S, A> | null,
  dispatch: ((A) => mixed) | null,
  lastRenderedReducer: ((S, A) => S) | null,
  lastRenderedState: S | null,
|};
```
- 在fiber对象中有一个属性fiber.updateQueue, 是一个链式队列(即使用链表实现的队列存储结构)

![图解](https://images-1306393180.cos.ap-chongqing.myqcloud.com/updatequeue.png)

### React-reconciler
将主要功能分为 4 个方面:
1. 输入: 暴露api函数(如: scheduleUpdateOnFiber), 供给其他包(如react包)调用.
2. 注册调度任务: 与调度中心(scheduler包)交互, 注册调度任务task, 等待任务回调.
3. 执行任务回调: 在内存中构造出fiber树, 同时与与渲染器(react-dom)交互, 在内存中创建出与fiber对应的DOM节点.
4. 输出: 与渲染器(react-dom)交互, 渲染DOM节点.

### Scheduler

#### Task
```js
var newTask = {
  id: taskIdCounter++,
  callback,
  priorityLevel,
  startTime,
  expirationTime,
  sortIndex: -1,
};
```
- 注意task中没有next属性, 它不是一个链表, 其顺序是通过堆排序来实现的(小顶堆数组, 始终保证数组中的第一个task对象优先级最高).

![图解](https://images-1306393180.cos.ap-chongqing.myqcloud.com/taskqueue.png)
