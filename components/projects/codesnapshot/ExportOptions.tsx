import { download } from '@/components/utils/image'
import { copyToClipboard } from '@/components/utils/text'
import { type TExportOption } from '@/types/codesnapshot.model'
import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image'
import { useCallback, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/components/utils'

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
      if (!conversionMethod) {
        setLoading(false)
        return
      }
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

  const dropdownClass =
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground   disabled:cursor-not-allowed disabled:opacity-50 '
  return (
    <div className="flex bg-input rounded-lg">
      {/* <Button
        className={cn(dropdownClass, 'rounded-e-none')}
        onClick={() => {
          handleAction(exportExtn)
        }}
      >
        {!loading ? 'Export' : 'Exporting'}
      </Button> */}

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            dropdownClass,
            ' rounded-e-none border-e-0 text-nowrap',
          )}
        >
          Pixel {pixel}px
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[1, 2, 3, 4, 5].map(lang => {
            return (
              <DropdownMenuItem key={lang} onClick={() => setPixel(lang)}>
                Pixel {lang}px
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(dropdownClass, 'rounded-s-none')}>
          {!loading ? 'Export' : 'Exporting'}
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
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {exportOptions.map(lang => {
            return (
              <DropdownMenuItem key={lang} onClick={() => handleAction(lang)}>
                {lang.toUpperCase()}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

ExportOptions.displayName = 'ExportOptions'

export default ExportOptions
