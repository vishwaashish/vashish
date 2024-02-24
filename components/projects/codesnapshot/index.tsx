'use client'
import html2canvas from 'html2canvas'
import { useEffect, useRef, useState } from 'react'
import { bundledLanguages, bundledThemes } from 'shiki/bundle/web'
import renderCode from './shikiRenderer'
import { HeadPara } from '@/components/shared/Heading'

const exportOptions: string[] = ['COPY', 'PNG', 'JPG', 'SVG']

function CodeSnapShot() {
  const [code, setCode] = useState("console.log('Hello, world!')")
  const [language, setLanguage] = useState('javascript')
  const [themes, setThemes] = useState('dark-plus')
  const editorRef = useRef<HTMLPreElement | null>(null)
  const [highlightedCode, setHighlightedCode] = useState('')
  const [format, setFormat] = useState('copy')

  useEffect(() => {
    async function highlightCode() {
      console.log({ language, themes })
      try {
        const highlighted = await renderCode(code, language, themes)
        setHighlightedCode(highlighted)
      } catch (e) {
        console.error(e)
      }
    }
    highlightCode()
  }, [code, language, themes])

  const handleChange = (e: any) => {
    setCode(e.target.value)
  }

  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value)
  }
  const handleThemeChange = (e: any) => {
    setThemes(e.target.value)
  }

  const handleFormatChange = (option: string) => () => {
    setFormat(option)
  }

  const handleAction = () => {
    switch (format) {
      case 'copy':
        editorRef.current &&
          html2canvas(editorRef.current).then(canvas => {
            canvas.toBlob(blob => {
              blob &&
                navigator.clipboard
                  .write([
                    new ClipboardItem({
                      'image/png': blob,
                    }),
                  ])
                  .then(() => {
                    console.log('Image copied successfully')
                  })
                  .catch(error => {
                    console.error('Error copying image:', error)
                  })
            })
          })
        break
      case 'png':
      case 'jpg':
      case 'svg':
        editorRef.current &&
          html2canvas(editorRef.current).then(canvas => {
            const imgData = canvas.toDataURL(`image/${format}`)
            const link = document.createElement('a')
            link.href = imgData
            link.download = `shiki_editor_capture.${format}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          })
        break
      default:
        break
    }
  }
  return (
    <HeadPara
      title="Code Snapshot"
      className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center max-w-full"
    >
      <p>
        Enhance User Experience and Aesthetics with Our Range of Creative CSS
        Loaders for Seamless Loading Animations
      </p>
      <p>
        📌 To bookmark this page, simply press <kbd className="kbd">Ctrl+D</kbd>
        .
      </p>
      <br />

      <div>
        <div className="flex flex-col h-screen gap-4 p-5">
          <div className="max-w-2xl gap-3 mx-auto grid grid-cols-3 justify-center items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={language}
              onChange={handleLanguageChange}
            >
              {Object.keys(bundledLanguages).map(lang => {
                return (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                )
              })}
            </select>
            <select
              className="select select-bordered w-full max-w-xs"
              value={themes}
              onChange={handleThemeChange}
            >
              {Object.keys(bundledThemes).map(theme => {
                return (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                )
              })}
            </select>

            <div className=" join">
              {/* <select
                className="join-item  select select-bordered w-full max-w-xs"
                value={format}
                onChange={handleFormatChange}
              >
                <option value="copy">Copy</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG</option>
              </select> */}
              <button className="join-item  btn" onClick={handleAction}>
                {format === 'COPY' ? 'Copy' : 'Export'}
              </button>
              <div className="dropdown join-item">
                <div tabIndex={0} role="button" className="btn px-2 join-item">
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
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu shadow1 bg-base-100 rounded-box"
                >
                  {exportOptions.map(option => (
                    <li onClick={handleFormatChange(option)} key={option}>
                     <a > {option}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <textarea
            className="flex-grow1 bg-gray-900 text-white p-4 outline-none resize-none"
            value={code}
            onChange={handleChange}
          ></textarea>

          <div>
            <pre
              ref={editorRef}
              className="flex-grow overflow-auto"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>
        </div>
      </div>
    </HeadPara>
  )
}

export default CodeSnapShot
