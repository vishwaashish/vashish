import { download } from '@/components/utils/image'
import { copyToClipboard } from '@/components/utils/text'
import html2canvas from 'html2canvas'
import { useMemo, useCallback, useState } from 'react'

interface ExportOptionsProps {
  // format: string
  // onSelectFormat: (option: string) => void
  element: any
}

const exportOptions: string[] = ['copy', 'png', 'jpg', 'svg']

const ExportOptions = ({ element }: ExportOptionsProps) => {
  const [loading, setLoading] = useState(false)
  const handleAction = useCallback(
    async (format: string) => {
      if (!element) return
      setLoading(true)

      const handleCanvas = (canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL(`image/${format}`)
        download(imgData, 'code_snapshot_capture', format)
      }

      const handleCopy = (canvas: HTMLCanvasElement) => {
        canvas.toBlob(blob => {
          blob && copyToClipboard(blob)
        })
      }

      if (format === 'copy') {
        await html2canvas(element as HTMLElement).then(handleCopy)
      } else {
        await html2canvas(element as HTMLElement).then(handleCanvas)
      }
      setLoading(false)
    },
    [element],
  )

  const exportOptionsList = exportOptions.map(option => (
    <li
      className="!m-0 !p-0"
      onClick={() => handleAction(option.toLowerCase())}
      key={option}
    >
      <a className="uppercase">{option}</a>
    </li>
  ))

  return (
    <div className="join border border-light">
      <button
        className="join-item flex-1 !border-solid border-light !border-0 !border-r-2 btn"
        onClick={() => handleAction('png')}
        disabled={!element}
      >
        {!loading ? 'Export' : 'Exporting'}
      </button>
      <div className="dropdown dropdown-end join-item">
        <button
          tabIndex={0}
          role="button"
          className="btn !px-2 join-item"
          disabled={!element}
        >
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
