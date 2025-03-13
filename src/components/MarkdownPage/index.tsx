'use client'
import useHighlightCode from '@/hooks/highlightCode'
import clientFetch from '@/utils/clientFetch'
import { Skeleton } from 'antd'
import { useEffect, useLayoutEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
export default function MarkdownPage(props: React.PropsWithChildren<{ file?: string }>) {
  const isCompelete = useHighlightCode()
  const [isLoading, setIsLoading] = useState(true)
  useLayoutEffect(() => {
    if (isCompelete) {
      const wrapperNode = document.querySelector('.contentWrapper')
      if (wrapperNode) {
        wrapperNode.classList.add('visible')
      }
      setIsLoading(false)
    }
  }, [isCompelete])

  useEffect(() => {
    clientFetch('/api/page-view', {
      next: {
        revalidate: 3600
      }
    }).then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <>
      {isLoading && <Skeleton style={{position: 'absolute', left: 0, padding: '50px 20px 0'}} active paragraph={{rows: 20}}  />}
      <div className="contentWrapper">
        <ReactMarkdown>{props.file}</ReactMarkdown>
      </div>
    </>
  )
}
