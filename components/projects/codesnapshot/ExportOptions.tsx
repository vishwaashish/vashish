import { download } from '@/components/utils/image'
import { copyToClipboard } from '@/components/utils/text'
import { TExportOption } from '@/types/codesnapshot.model'
import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image'
import { useCallback, useState } from 'react'

const exportOptions: TExportOption[] = ['copy', 'png', 'jpg', 'svg']

const imageFormats: { [key in TExportOption]: Function } = {
  png: toPng,
  jpg: toJpeg,
  svg: toSvg,
  copy: toBlob,
}

const ExportOptions = () => {
  const [loading, setLoading] = useState(false)
  const [exportExtn, setExportExtn] = useState<TExportOption>('png')
  const [pixel, setPixel] = useState<number>(3)

  const handleAction = useCallback(
    (format: TExportOption) => {
      setExportExtn(format)
      const editorViewport = document.getElementById('editor_viewport')
      if (!editorViewport) return
      setLoading(true)
      const conversionMethod = imageFormats[format]
      if (!conversionMethod) return setLoading(false)
      const option = { pixelRatio: pixel }
      conversionMethod(editorViewport, option)
        .then((data: any) => {
          if (typeof data === 'string') {
            download(data, 'code_snapshot_capture', format)
          }
          if (format === 'copy' && data) {
            copyToClipboard(data)
          }
        })
        .catch((error: Error) => {
          console.error('Error saving image:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [pixel],
  )

  const exportOptionsList = exportOptions.map(option => (
    <li key={option} className="!m-0 !p-0">
      <span
        className={`uppercase ${exportExtn === option ? 'active' : ''}`}
        onClick={() => handleAction(option)}
      >
        {option}
      </span>
    </li>
  ))

  const pixelOptions = [1, 2, 3, 4, 5].map(item => (
    <li key={item} onClick={() => setPixel(item)} className="!m-0 !p-0">
      <span className={item === pixel ? 'active' : ''}>{item}x</span>
    </li>
  ))
  return (
    <div className="join border border-light">
      <button
        className="join-item flex-1 !border-solid border-light !border-0 input"
        onClick={() => handleAction(exportExtn)}
      >
        {!loading ? 'Export' : 'Exporting'}
      </button>
      <div className="dropdown dropdown-end join-item">
        <button
          tabIndex={0}
          role="button"
          className="input !px-2 !border-0 !border-x-2 border-light join-item lowercase"
        >
          {pixel}x
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu !px-2 shadow bg-base-100 rounded-box"
        >
          {pixelOptions}
        </ul>
      </div>
      <div className="dropdown dropdown-end join-item">
        <button tabIndex={0} role="button" className="input !px-2 join-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu !px-2 shadow bg-base-100 rounded-box"
        >
          {exportOptionsList}
        </ul>
      </div>
    </div>
  )
}

ExportOptions.displayName = 'ExportOptions'

export default ExportOptions
