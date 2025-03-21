'use client'
import Image from 'next/image'
import { GithubOutlined, MenuOutlined, TikTokOutlined, WechatOutlined } from '@ant-design/icons'
import styles from './index.module.css'
import { useState } from 'react'
import { Drawer } from 'antd'
import MenuComp from '../Menu'
import { usePathname } from 'next/navigation'
import { MenuItems } from '@/common/menus'
import Link from 'next/link'

function getRouteTitle(pathname: string, menu: any[]) {
  const paths = pathname.split('/').filter(item => item)
  let currentMenu: any = menu
  while(paths.length > 0) {
    const current = paths.shift()
    if (current) {
      if (Array.isArray(currentMenu)) {
        currentMenu = currentMenu.find(item => item.key === current)
      } else if(currentMenu && currentMenu.children) {
        currentMenu = currentMenu.children.find((item: any) => item.key === current)
      } else {
        return current
      }
    }
  }
  return currentMenu?.label
}

export default function Header() {
  const pathname = usePathname()
  const currentpath = getRouteTitle(pathname, MenuItems)
  const [isExpand, setIsExpand] = useState(false)
  function menuCallback() {
    setIsExpand(false)
  }
  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div className={styles.left}>
          {/* <h2>By</h2> */}
          <Link href="/" style={{textDecoration: 'none'}}>
            <Image src="/next.svg" alt="icon" width="50" height="50" />
            {/* <h4 style={{color: '#fff'}}>面试宝典</h4> */}
          </Link>
        </div>
        <div className={styles.centerPathName}>{currentpath}</div>
        <div className={styles.rightMenuIcon}>
          <MenuOutlined style={{fontSize: '20px'}} onClick={() => setIsExpand(!isExpand)} />
        </div>
        <div className={styles.rightLinkIcons}>
          <WechatOutlined style={{fontSize: '20px'}} />
          <GithubOutlined style={{fontSize: '20px'}} />
          <TikTokOutlined style={{fontSize: '20px'}} />
        </div>
      </div>
      <Drawer
        title={null}
        onClose={() => setIsExpand(false)}
        open={isExpand}
        closeIcon={null}
        zIndex={999}
        className="menu-drawer"
        width="max-content"
        placement='left'>
        <MenuComp show={true} callback={menuCallback} />
      </Drawer>
    </header>
  )
}
