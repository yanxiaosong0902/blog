import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Header from '@/components/Header'
import MenuComp from '@/components/Menu'
import './global.css'
import styles from './layout.module.css'
import 'highlight.js/styles/atom-one-dark.css'
import Background from '@/components/Background'
import { ConfigProvider } from 'antd'

export const metadata: Metadata = {
  title: 'yxsss',
  description: 'yxsss fe blog',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <ConfigProvider theme={{
          components: {
            Menu: {
              darkItemBg: '#235b90',
              darkPopupBg: '#235b90',
              darkSubMenuItemBg: '#235b90'
              // darkSubMenuItemBg: 'rgba(0, 21, 41, 0.3)'
            }
          }
        }}>
          <AntdRegistry>
            <div className={styles.mainWrapper}>
              <Header />
              <div className={styles.container}>
                <MenuComp />
                <div className={styles.contentWrapper}>
                  <Background />
                  {children}
                </div>
              </div>
            </div>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
