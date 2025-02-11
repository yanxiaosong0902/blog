import { MenuItems } from '@/common/menus'
import Link from 'next/link'

type MenuItem = {
  key: string
  label: string
  children?: MenuItem[]
}

export default function Home() {
  function RenderMenu(item: MenuItem) {
    return (
      <>
        <h2>{item.label.replace(/[a-z]/i, (v) => v.toUpperCase())}</h2>
        <ul>
          {
            item.children?.map((child) => (
              <li key={child.key}>
                <Link href={`/${item.key}/${child.key}`}>{child.label}</Link>
              </li>
            ))
          }
        </ul>
      </>
    )
  }
  return (
    <div className="contentWrapper common">
      <h1>This is Yxsss&#39; Home page</h1>
      {
        MenuItems.map((item) => RenderMenu(item))
      }
    </div>
  )
}
