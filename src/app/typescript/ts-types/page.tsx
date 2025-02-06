'use client'
import useHighlightCode from '@/hooks/highlightCode'
import ReactMarkdown from 'react-markdown'
import file from './index.md'
export default function pageTypes() {
  useHighlightCode()
  return (
    <div className="contentWrapper">
      <ReactMarkdown>{file}</ReactMarkdown>
    </div>
  )
}
