import type { Metadata } from 'next'
import Head from 'next/head'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Header from '@/components/Header'
import MenuComp from '@/components/Menu'
import './global.css'
import styles from './layout.module.css'
import 'highlight.js/styles/atom-one-dark.css'

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
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <AntdRegistry>
          <div className={styles.mainWrapper}>
            <Header />
            <div className={styles.container}>
              <MenuComp />
              <div className={styles.contentWrapper}>{children}</div>
            </div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  )
}
