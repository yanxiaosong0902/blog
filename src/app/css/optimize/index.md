## FOUC
- Flash of Unstyled Content（FOUC）
#### 导致的原因
- 客户端渲染
- 样式延迟加载
- 主题切换
- 大 css 文件
- 复杂的客户端混合
#### 解决方案
- 服务端渲染
- 客户端挂载状态检查
- 加载骨架屏
- 预加载重要的 css
- 过渡效果
- 利用 nextjs 内置的加载状态
#### style-components
```ts
'use client'
 
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
 
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  if (typeof window !== 'undefined') return <>{children}</>
 
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```