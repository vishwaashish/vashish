import { useEffect, useRef, useState } from 'react'
import renderCode from './shikiRenderer'

interface EditorProps {
  code: string
  language: string
  theme: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Editor({ code, onChange }: EditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const [highlightedCode, setHighlightedCode] = useState<string>('')

  //   useEffect(() => {
  //     async function highlightCode() {
  //       try {
  //         const highlighted = await renderCode(code, language, theme)
  //         setHighlightedCode(highlighted)
  //       } catch (e) {
  //         console.error('Error highlighting code:', e)
  //       }
  //     }
  //     highlightCode()
  //   }, [code, language, theme])

  return (
    <textarea
      ref={editorRef}
      className="textarea textarea-bordered w-full bg-transparent"
      value={code}
      placeholder="Enter Code"
      rows={5}
      onChange={onChange}
    ></textarea>
  )
}

export default Editor
