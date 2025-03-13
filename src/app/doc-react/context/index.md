### Context
```tsx
const Ctx = createContext(null)

function Container(props) {
  const [value, setValue] = useState(null)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue(v => v + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [value])
  return (
    <Ctx.Provider value={value}>
      {props.children}
    </Ctx.Provider>
  )
}

function App() {
  return (
    <Container>
      <Child/>
    </Container>
  )
}

function Child() {
  const ctx = useContext()
  return (
    <div>ctx value is :{ctx}</div>
  )
}

function NotUseCtx() {
  console.log('没有订阅过ctx, 所以只会渲染一次')
  return (
    <div>hello world</div>
  )
}
```