'use client'
import { Menu } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'
import styles from './index.module.css'
import { useRouter } from 'next/navigation'
import { MenuItems } from '@/common/menus'
import { useLayoutEffect, useRef } from 'react'

type Props = {
  show?: boolean
  callback?: (current: string) => void
}

export default function MenuComp(props: Props) {
  const { show, callback } = props
  const router = useRouter()
  const wrapper = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (show) {
      wrapper.current?.style.setProperty('display', 'block')
    }
  }, [show])

  function handleMenuChange(info: MenuInfo) {
    const path = info.keyPath.reverse().join('/')
    router.push(`/${path}`)
    if (callback) {
      callback(info.key)
    }
  }
  return (
    <div className={styles.menuWrapper} ref={wrapper}>
      <Menu items={MenuItems} mode="inline" className={styles.antdMenu} theme='dark' onClick={handleMenuChange} />
    </div>
  )
}
