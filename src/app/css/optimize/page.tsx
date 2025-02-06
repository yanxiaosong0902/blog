'use client'
import useHighlightCode from '@/hooks/highlightCode'
import file from './index.md'
import ReactMarkdown from 'react-markdown'
export default function PageOptimize() {
  useHighlightCode()
  return (
    <div className="contentWrapper">
      <ReactMarkdown>{file}</ReactMarkdown>
    </div>
  )
}
