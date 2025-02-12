'use client'

import { useLayoutEffect } from 'react'

class Point {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  constructor(x: number, y: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.x = x
    this.y = y
    this.vx = Math.random() * 2 - 1 // 随机水平速度
    this.vy = Math.random() * 2 - 1 // 随机垂直速度
    this.radius = 2 // 点的大小
    this.ctx = ctx
    this.canvas = canvas
  }

  // 更新点的位置
  update() {
    this.x += this.vx
    this.y += this.vy

    // 边界检测
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }

  // 绘制点
  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = '#fff' // 点的颜色
    this.ctx.fill()
  }
}

export default function Background() {
  useLayoutEffect(() => {

    // require('./bg.js')
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    // 设置画布大小
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 点的数量
    let numPoints: number
    let twoPointDistance: number
    let distance: number
    let points: Point[] = []

    function getNumPoints(width: number) {
      const num = Math.round(width / 20)
      return num > 150 ? 150 : (num < 30 ? 30 : num)
    }

    function getDistance(width: number, rate: number) {
      const num = Math.round(width / rate)
      return num > 150 ? 150 : (num < 100 ? 100 : num)
    }

    function initPoints() {
      if (!ctx) {
        return
      }
      // 点的数量
      numPoints = getNumPoints(canvas.width)
      twoPointDistance = getDistance(canvas.width, 10)
      distance = getDistance(canvas.width, 10)
      points = []
      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        points.push(new Point(x, y, ctx, canvas))
      }
    }

    initPoints()

    // 鼠标位置
    let mouseX: number | null = null
    let mouseY: number | null = null

    // 监听鼠标移动
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    // 绘制线条
    function drawLines() {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // 如果两点距离小于一定值，则绘制线条
          if (dist < twoPointDistance && ctx) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / twoPointDistance})` // 线条颜色和透明度
            ctx.stroke()
          }
        }

        // 如果鼠标位置存在，绘制点到鼠标的线条
        if (mouseX !== null && mouseY !== null) {
          const dx = points[i].x - mouseX
          const dy = points[i].y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < distance && ctx) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(mouseX, mouseY)
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / distance})`
            ctx.stroke()
          }
        }
      }
    }

    // 动画循环
    function animate() {
      if (!ctx) {
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height) // 清空画布

      // 更新和绘制所有点
      points.forEach((point) => {
        point.update()
        point.draw()
      })

      // 绘制线条
      drawLines()

      requestAnimationFrame(animate) // 循环调用
    }

    // 启动动画
    animate()

    // 窗口大小调整时重置画布
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPoints()
    })

  })
  return (
    <canvas id="bg-canvas" />
  )
}
