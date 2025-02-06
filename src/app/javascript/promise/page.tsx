'use client'
import file from './index.md'
import ReactMarkdown from 'react-markdown'
import useHighlightCode from '@/hooks/highlightCode'
export default function PagePromise() {
  useHighlightCode()
  return (
    <div className="contentWrapper">
      <ReactMarkdown>{file}</ReactMarkdown>
    </div>
  )
}
