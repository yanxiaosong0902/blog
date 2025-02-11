// script.js
const canvas = document.getElementById('bg-canvas')
const ctx = canvas.getContext('2d')

// 设置画布大小
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// 点的数量
const numPoints = 100
const points = []

// 点的类
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = Math.random() * 2 - 1 // 随机水平速度
    this.vy = Math.random() * 2 - 1 // 随机垂直速度
    this.radius = 2 // 点的大小
  }

  // 更新点的位置
  update() {
    this.x += this.vx
    this.y += this.vy

    // 边界检测
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1
  }

  // 绘制点
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff' // 点的颜色
    ctx.fill()
  }
}

// 初始化点
for (let i = 0; i < numPoints; i++) {
  const x = Math.random() * canvas.width
  const y = Math.random() * canvas.height
  points.push(new Point(x, y))
}

// 鼠标位置
let mouseX = null
let mouseY = null

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
      if (dist < 200) {
        ctx.beginPath()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[j].x, points[j].y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})` // 线条颜色和透明度
        ctx.stroke()
      }
    }

    // 如果鼠标位置存在，绘制点到鼠标的线条
    if (mouseX !== null && mouseY !== null) {
      const dx = points[i].x - mouseX
      const dy = points[i].y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        ctx.beginPath()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(mouseX, mouseY)
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 150})`
        ctx.stroke()
      }
    }
  }
}

// 动画循环
function animate() {
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
})
