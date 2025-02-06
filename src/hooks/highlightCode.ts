import { useEffect } from 'react'
import highlight from 'highlight.js'

export default function useHighlightCode() {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block: any) => {
      highlight.highlightElement(block)
    })
  })
}
