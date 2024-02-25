import toast from 'react-hot-toast'

export function download(
  imgData: string,
  fileName: string = 'vashish',
  format: string = 'png',
) {
  const link = document.createElement('a')
  link.href = imgData
  link.download = `${fileName}.${format}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  toast.success('Download successfully!', { id: 'download' })
}
