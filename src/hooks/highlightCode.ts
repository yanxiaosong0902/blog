import { useEffect, useState } from 'react'
import highlight from 'highlight.js'

export default function useHighlightCode() {
  const [isCompelete, setIsCompelete] = useState(false)
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block: any) => {
      highlight.highlightElement(block)
    })
    setIsCompelete(true)
  }, [])
  return isCompelete
}
