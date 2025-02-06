import Image from 'next/image'
import styles from './index.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div className={styles.left}>
          <h2>By</h2>
          <Image src="/next.svg" alt="icon" width="60" height="60" />
        </div>
        <div className={styles.right}>
          quick link
        </div>
      </div>
    </header>
  )
}
