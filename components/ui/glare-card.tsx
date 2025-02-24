import { useRef } from 'react'
import { cn } from '../utils'

export const GlareCard = ({
  children,
  className,
  containerClassName
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const isPointerInside = useRef(false)
  const refElement = useRef<HTMLDivElement>(null)
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  })
  const containerStyle = {
    '--m-x': '50%',
    '--m-y': '50%',
    '--r-x': '0deg',
    '--r-y': '0deg',
    '--bg-x': '50%',
    '--bg-y': '50%',
    '--duration': '300ms',
    '--foil-size': '100%',
    '--opacity': '0',
    '--easing': 'ease',
    '--transition': 'var(--duration) var(--easing)',
  } as any

  const updateStyles = () => {
    if (refElement.current) {
      console.log(state.current)
      const { background, rotate, glare } = state.current
      refElement.current?.style.setProperty('--m-x', `${glare.x}%`)
      refElement.current?.style.setProperty('--m-y', `${glare.y}%`)
      refElement.current?.style.setProperty('--r-x', `${rotate.x}deg`)
      refElement.current?.style.setProperty('--r-y', `${rotate.y}deg`)
      refElement.current?.style.setProperty('--bg-x', `${background.x}%`)
      refElement.current?.style.setProperty('--bg-y', `${background.y}%`)
    }
  }
  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform"
      ref={refElement}
      onPointerMove={event => {
        const rotateFactor = 0.4
        const rect = event.currentTarget.getBoundingClientRect()
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        }
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        }

        const { background, rotate, glare } = state.current
        background.x = 50 + percentage.x / 4 - 12.5
        background.y = 50 + percentage.y / 3 - 16.67
        rotate.x = -(delta.x / 3.5)
        rotate.y = delta.y / 2
        rotate.x *= rotateFactor
        rotate.y *= rotateFactor
        glare.x = percentage.x
        glare.y = percentage.y

        updateStyles()
      }}
      onPointerEnter={() => {
        isPointerInside.current = true
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty('--duration', '0s')
            }
          }, 300)
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false
        if (refElement.current) {
          refElement.current.style.removeProperty('--duration')
          refElement.current?.style.setProperty('--r-x', `0deg`)
          refElement.current?.style.setProperty('--r-y', `0deg`)
        }
      }}
    >
      <div className={cn("h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))]  hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden", containerClassName)}>
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light ">
          <div className={cn('h-full w-full bg-slate-950', className)}>
            {children}
          </div>
        </div>
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
      </div>
    </div>
  )
}
