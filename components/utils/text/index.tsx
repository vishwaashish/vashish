import toast from 'react-hot-toast'

export const copyText = async (text: string) => {
  if (!text) return toast.error('Copied text is invalid!')
  return await navigator.clipboard.writeText(text).then(val => {
    toast.success('Copied to clipboard!', {
      id: text,
    })
  })
}


