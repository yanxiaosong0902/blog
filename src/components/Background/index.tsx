'use client'

import { useLayoutEffect } from 'react'

export default function Background() {
  useLayoutEffect(() => {
    // eslint-disable-next-line
    require('./bg.js')
  })
  return (
    <canvas id="bg-canvas" />
  )
}
