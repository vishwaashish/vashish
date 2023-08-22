import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '../utils'

export default function Header() {
  const themeOptions = [
    'light',
    'dark',
    'cupcake',
    'dracula',
    'night',
    'wireframe',
  ]
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const data = document.getElementsByTagName('html')[0]
    const theme = data.getAttribute('data-theme') || 'dark'
    setCurrentTheme(theme)
  }, [])

  const onThemeChange = (value: string) => () => {
    console.log(value)
    const data = document.getElementsByTagName('html')[0]
    data.setAttribute('data-theme', value)
    setCurrentTheme(value)
  }

  return (
    <div className="navbar  z-[100] ">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold cursor-pointer">
            AVishwakarma
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn normal-case btn-ghost">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                ></path>
              </svg>{' '}
              <span className="hidden font-normal md:inline">Theme</span>{' '}
              <svg
                width="12px"
                height="12px"
                className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <div
              tabIndex={0}
              className="dropdown-content bg-base-200 text-base-content rounded-box top-px  w-56 overflow-y-auto shadow mt-16 z-[100]"
            >
              <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                {themeOptions.map(item => (
                  <button
                    key={item}
                    className="outline-base-content overflow-hidden rounded-lg text-left"
                    data-set-theme={item}
                    data-act-classname="[&amp;_svg]:visible"
                    onClick={onThemeChange(item)}
                  >
                    <div
                      data-theme={item}
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={cn(
                              'invisible h-3 w-3 shrink-0',
                              currentTheme === item && 'visible',
                            )}
                          >
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                          </svg>{' '}
                          <div className="flex-grow text-sm">{item}</div>{' '}
                          <div
                            className="flex h-full flex-shrink-0 flex-wrap gap-1"
                            data-svelte-h="svelte-izuv7l"
                          >
                            <div className="bg-primary w-2 rounded"></div>{' '}
                            <div className="bg-secondary w-2 rounded"></div>{' '}
                            <div className="bg-accent w-2 rounded"></div>{' '}
                            <div className="bg-neutral w-2 rounded"></div>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <span
              className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
              data-tip="GitHub"
              data-svelte-h="svelte-j52hjb"
            >
              <div className="flex-none items-center">
                <a
                  aria-label="Github"
                  target="_blank"
                  href="https://github.com/saadeghi/daisyui"
                  rel="noopener, noreferrer"
                  className="btn btn-ghost drawer-button btn-square normal-case"
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="inline-block h-5 w-5 fill-current md:h-6 md:w-6"
                  >
                    <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
                  </svg>
                </a>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
