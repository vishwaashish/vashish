'use client'
import {
  Tooltip
} from '@/components/ui/tooltip'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { memo } from 'react'
import Container from '../shared/Container'
import { cn } from '../utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'

function Header({ mode = 'all' }: { mode?: 'dark' | 'all' }) {
  const { setTheme } = useTheme()

  return (
    <div className={cn(mode === 'dark' && 'text-[#020817]')}>
      <Container className="flex items-center w-full px-5 relative z-10 py-2">
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-bold cursor-pointer flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="30"
              viewBox="0 0 42 30"
              fill="none"
            >
              <path
                d="M24.9463 0L13.4363 24.8431H3.66446L1.73828 29.9181L16.349 29.9591L27.9793 4.91132H37.49L39.9799 0H24.9463Z"
                className={cn('fill-foreground')}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.2282 8.95173L13.3946 0.0410156H12.5969L4.29718 17.9777L9.81311 17.8939C11.1255 15.087 12.4328 12.2814 13.3946 10.2131L15.6471 14.4446L18.2282 8.95173ZM8.39825 20.9157L2.89903 20.9993L0.0202526 27.2207C-0.0579602 27.8989 0.0484092 29.3528 1.09959 29.7434C2.41356 30.2317 4.1498 29.6213 4.61908 28.8483C4.81674 28.5226 6.47147 25.0244 8.39825 20.9157Z"
                fill="#570DF8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.8183 19.4816L21.2344 24.9659L23.9122 30H28.7042L37.0336 12H31.4345C29.5031 16.1479 27.4707 20.6003 26.0733 23.7381L23.8183 19.4816ZM32.8393 9H38.4219L41.9995 1.2688C41.8272 0.845883 41.1632 0.0082294 39.8854 0.0409716C38.2881 0.0818993 37.6463 0.243089 36.9257 0.818585C36.6565 1.03349 34.9317 4.5589 32.8393 9Z"
                fill="#570DF8"
              />
            </svg>
            <span className={cn(mode === 'dark' && 'text-accent-content')}>
              AVishwakarma
            </span>
          </Link>
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'link'} size="icon" hover="none">
                <Sun
                  fill={cn('yellow')}
                  className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  fill={cn(
                    'fill-foreground',
                    mode === 'dark' && 'text-[#020817]',
                  )}
                  className={cn(
                    'absolute fill-foreground stroke-foreground h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
                    mode === 'dark' && 'stroke-[#020817]',
                  )}
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setTheme('light')
                }}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme('dark')
                }}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme('system')
                }}
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip title="GitHub">
            <Button variant="link" size="icon" asChild>
              <a
                aria-label="Github"
                target="_blank"
                href="https://github.com/vishwaashish"
                rel="noopener, noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className={cn(
                    'fill-foreground',
                    mode === 'dark' && 'fill-[#020817]',
                  )}
                >
                  <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
                </svg>
              </a>
            </Button>
          </Tooltip>
        </div>
      </Container>
    </div>
  )
}

export default memo(Header)
