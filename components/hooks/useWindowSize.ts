import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  breakpoint: Breakpoint
}

enum Breakpoint {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl',
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    breakpoint: Breakpoint.SM,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let breakpoint = Breakpoint.SM

      if (width >= 1536) {
        breakpoint = Breakpoint.XXL
      } else if (width >= 1280) {
        breakpoint = Breakpoint.XL
      } else if (width >= 1024) {
        breakpoint = Breakpoint.LG
      } else if (width >= 768) {
        breakpoint = Breakpoint.MD
      } else if (width >= 640) {
        breakpoint = Breakpoint.SM
      }

      setWindowSize({ width, breakpoint })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
