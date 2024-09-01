import { useEffect } from 'react'

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  editorContent: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef && editorContent) {
      textAreaRef.style.height = '23px'
      const scrollHeight = textAreaRef.scrollHeight
      textAreaRef.style.height = scrollHeight + 'px'
      editorContent.style.height = scrollHeight + 'px'
    }
  }, [editorContent, textAreaRef, value])
}
