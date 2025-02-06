'use client'
import { Menu } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'
import styles from './index.module.css'
import { useRouter } from 'next/navigation'

export default function MenuComp() {
  const router = useRouter()
  const items = [{
    key: 'javascript',
    label: 'javascript',
    children: [{
      key: 'promise',
      label: 'promise'
    }, {
      key: 'gc',
      label: '垃圾回收'
    }]
  }, {
    key: 'typescript',
    label: 'typescript'
  }, {
    key: 'react',
    label: 'react'
  }, {
    key: 'vue',
    label: 'vue'
  }, {
    key: 'node',
    label: 'node'
  }, {
    key: 'css',
    label: 'css',
    children: [{
      key: 'optimize',
      label: '优化'
    }]
  }]

  function handleMenuChange(info: MenuInfo) {
    const path = info.keyPath.reverse().join('/')
    console.log(path)
    router.push(`/${path}`)
  }
  return (
    <div className={styles.menuWrapper}>
      <Menu items={items} mode="inline" className={styles.antdMenu} onClick={handleMenuChange} />
    </div>
  )
}
