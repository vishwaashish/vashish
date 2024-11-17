'use client'
import { CopyButton } from '@/components/shared/CopyButton'
import InnerHTML from '@/components/shared/InnerHtml'
import { cn, formatCode } from '@/components/utils'
import { useEffect, useState } from 'react'
import renderCode from '../codesnapshot/shikiRenderer'

const CodeTab = ({
  element,
  parser = 'babel',
  className = '',
}: {
  element: string
  parser: string
  className?: string
}) => {
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState({ bgColor: '#1b1b1b', color: '#D4D4D4' })

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const elementFormat = await formatCode(element, parser)
        const renderElement = await renderCode(
          elementFormat || '',
          'javascript',
          'dark-plus',
        )
        const colorRegex = /#(?:[0-9a-fA-F]{3}){1,2}/g
        if (renderElement) {
          const [backgroundColor, textcolor] = renderElement.match(
            colorRegex,
          ) || ['#00000', '#fffff']
          setState(renderElement)
          setColor({
            bgColor: backgroundColor,
            color: textcolor,
          })
        }
        setLoading(false)
      } catch (e) {
        console.error(e)
        const renderElement = await renderCode(
          'Something went wrong!' || '',
          'javascript',
          'dark-plus',
        )
        renderElement && setState(renderElement)
        setLoading(false)
      }
    }

    highlightCode()
  }, [element, parser])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div
          className={cn('rounded-lg bg-muted h-[427px] w-full', className)}
        ></div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        `h-[427px] overflow-auto p-5 text-sm rounded-lg relative`,
        className,
      )}
      style={{
        color: color.color,
        backgroundColor: color.bgColor,
      }}
    >
      {!!state && (
        <div className="top-2 absolute right-2  dark">
          <CopyButton
            copy={state}
            className="bg-transparent border border-muted-foreground hover:border-accent-foreground"
          />
        </div>
      )}
      <InnerHTML html={state}></InnerHTML>
    </div>
  )
}

export default CodeTab
