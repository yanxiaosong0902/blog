### 前端性能优化
#### 指标
- ‌Largest Contentful Paint (LCP)‌：这是衡量页面主要内容的加载速度，LCP应在页面首次开始加载后的2.5秒内完成，以确保良好的用户体验。
- ‌First Input Delay (FID)‌：衡量页面的可交互性，FID应小于100毫秒，以确保页面能够快速响应用户的交互操作‌
- ‌Cumulative Layout Shift (CLS)‌：衡量页面的视觉稳定性，CLS应保持在0.1以下，以减少页面内容在用户阅读或交互时的意外移动‌
- ‌Time to Interactive (TTI)‌：表示页面完全达到可交互状态的时间，TTI应尽可能短，以确保用户可以尽快进行交互操作‌
- ‌First Contentful Paint (FCP)‌：页面首次绘制文本、图片等内容的时间，FCP标志着页面开始呈现内容‌
- ‌First Meaningful Paint (FMP)‌：表示页面的主要内容开始出现在屏幕上的时间点，尽管FMP已被LCP取代，但仍是一个重要的性能指标‌
#### 打包优化
- 通过 splitChunks 分包
- UgliyJS 缩小体积
- 移除 console.log
- Terser 进行 TreeShaking 去掉没有用到的模块（要求 EsModule）
- extension/alias/include(loader)减少查找文件的时间（属于构建速度优化）
- SWC 替代 babel（属于构建速度优化）
- dll 多进程打包（属于构建速度优化）
#### 网络优化
- http1.1 -> http2
- CDN
- 图片优化。如图片压缩、图片格式、小文件转 base64、雪碧图。
- 请求合并
- DNS 预解析（dns-prefetch， https需要设置<meta http-equiv="x-dns-prefetch-control" content="on">强制开启。a 标签会自动启用 dns-prefetch）
- 资源预加载
- 文字优化，使用 font-spider 提取用到的文字。
- gzip
- 缓存
- 域名收敛（静态资源放在同一个域名，减少 dns 解析的开销）
- 域名发散（静态资源和动态请求不放在同一个域名里，避免到达同域名的最大请求数限制，静态资源请求也不需要携带 cookie。一般主域名+ CDN 域名就够了）
#### Vue 优化
- v-if & v-show
- keepalive
#### React 优化
- React.memo（props 的浅比较）
- PureComponent（state & props 的浅比较）
- shouldComponentUpdate（也可能带来因为浅比较导致的组件没有正确重新渲染的 BUG）
- Suspense
- useMemo / useCallback(如果传给子组件的派生状态或函数，每次都是新的引用，那么 PureComponent 和 React.memo 优化就会失效。所以需要使用 useMemo 和 useCallback 来生成稳定值，并结合 PureComponent 或 React.memo 避免子组件重新 Render。)
##### props.children
- 如下代码中，Render 组件是包裹在 Click 组件中的，如果不是通过 props.children 来插入到 Click组件中（就如同 vue 中的 slot 插槽）的话, 如注释的这段代码，这样就会重新渲染，除非用 React.memo 或者 PureComponent 包裹。因为 React 在遇见<XXXX> 这种非原始的 html 标签就会调用 createElement 方法去创建 fiber 节点， props 的引用就会是一个新的值。
- 当通过 props.children 这种方式插入到组件中，只要上层节点的 props 没有发生改变，那么就不会重新渲染。
```tsx
import React, { useState } from 'react'
export default function ReRenderTest() {
  return (
    <div className="app">
      <Click>
        <Render />
      </Click>
    </div>
  )
}

function Click({ children }) {
  const [count, setCount] = useState(0)
  return (
    <div className="click">
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+++</button>
      {children}
    </div>
  )
}

// function Click({ children }) {
//   const [count, setCount] = useState(0)
//   return (
//     <div className="click">
//       <h2>{count}</h2>
//       <button onClick={() => setCount(count + 1)}>+++</button>
//       <Render />
//     </div>
//   )
// }

function Render() {
  const count = React.useRef(0)
  React.useEffect(() => {
    console.log('component rendered', count.current++)
  })
  return <div className="render"><p>sub</p></div>
}

```
##### 发布订阅模式
- 比如使用 Context 的时候，因为状态向下传递，会导致所有下层组件都会重新渲染。
- 使用发布订阅模式，只有需要该状态的组件才去订阅，那么状态发生变化时，就只有订阅过的组件才会重新渲染
#### 通用框架
- 路由懒加载
- 图片懒加载
- 异步组件
- 列表合理使用 key
#### JS
- 保存.length值，不频繁访问
- 算法
- webWorker 耗时计算任务交给 webWorker线程。
#### CSS
- 避免重绘（repaint）和回流（reflow）
- 触发GPU加速：transform、filter、will-change、position: fixed。
- 动画元素脱离文档流，如设置 postion：absolute or fixed。避免引起回流。
- 通过修改 className 批量修改元素样式。
- 避免使用 table 布局，table回流会导致里面所有元素回流。
- 用 translate 代替 top、bottom等。
- 使用 DocumentFragment 来创建多个节点。
- 元素设置最小高度/最大高度，避免页面坍塌、减少回流。
- 减少使用层级较深的选择器，或其他一些复杂的选择器，以提高CSS渲染效率。
- 在大量修改元素样式时，可以先用 display： none 将其隐藏，修改完再设置为 display： block，这样只会造成两次回流。
- 必要时使用 css 属性 contain 将一个元素及其内容与文档流隔离，防止元素内部在其包围盒外产生副作用。
#### SSR / SSG
- 服务端渲染提高首屏加载速度，也能优化 SEO


