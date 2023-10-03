'use client'
import InsertHead from '@/components/shared/InsertHead'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { gradient } from '@/components/Gradient'
import Headers from '@/components/header'

export default function Home() {
  useEffect(() => {
    gradient.initGradient('#gradient-canvas')
  }, [])
  return (
    <>
      <InsertHead
        title="Ashishkumar Vishwakarma"
        description="I'm a passionate frontend developer with a strong
                  foundation in engineering. With a deep love for clean and
                  user-friendly design, I transform ideas into beautifully
                  crafted, responsive web experiences."
      />

     
      <AnimatePresence>
        <div className="relative font-inter ">
          <motion.canvas
            initial={{
              filter: 'blur(20px)',
            }}
            animate={{
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 1,
              ease: [0.075, 0.82, 0.965, 1],
            }}
            style={
              {
                // clipPath:
                // 'polygo`n(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)',
              }
            }
            id="gradient-canvas"
            data-transition-in
            className="absolute top-0 h-full z-0 w-full"
            // className="z-50 absolute top-0 right-[-2px] w-[30%] md:w-1/2 h-screen x"
          ></motion.canvas>
          <div className=" ">
            <Headers />
            <main
              className="flex justify-center flex-col max-w-[1200px] mx-auto  w-full px-4 "
              style={{ minHeight: 'calc(100dvh - 39px - 64px)' }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.95,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
                className="text-accent-content relative mb-[15px] md:ml-[-10px] md:mb-[37px] font-extrabold text-[14vw] md:text-[100px] lg:text-[130px]  font-inter  leading-[0.9] tracking-[-2px] z-[100]"
              >
                Ashishkumar <br />
                <span className="text-primary">Vishwakarma</span>
                <span className="font-inter text-primary">.</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.95,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
                className="text-left  z-20  mt-1  md:mb-[35px] "
              >
                <div className="">
                  <p className="font-normal max-w-[900px] md:text-lg text-accent-content  ">
                    I&apos;m a passionate frontend developer with a strong
                    foundation in engineering. With a deep love for clean and
                    user-friendly design, I transform ideas into beautifully
                    crafted, responsive web experiences.
                  </p>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-[15px] mt-8 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55,
                    duration: 0.55,
                    ease: [0.075, 0.82, 0.965, 1],
                  }}
                  className="grow sm:grow-0"
                >
                  <Link
                    href="https://github.com/vishwaashish/vashish"
                    target="_blank"
                    className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                    style={{
                      boxShadow:
                        '0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Star on Github
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55,
                    duration: 0.55,
                    ease: [0.075, 0.82, 0.965, 1],
                  }}
                  className="grow sm:grow-0"
                >
                  <Link
                    href="/generate-password"
                    className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                    style={{
                      boxShadow:
                        '0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Password Generator
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55,
                    duration: 0.55,
                    ease: [0.075, 0.82, 0.965, 1],
                  }}
                  className="grow sm:grow-0"
                >
                  <Link
                    href="/validate-password"
                    className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                    style={{
                      boxShadow:
                        '0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Password Validator
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55,
                    duration: 0.55,
                    ease: [0.075, 0.82, 0.965, 1],
                  }}
                  className="grow sm:grow-0"
                >
                  <Link
                    href="/css-loaders"
                    className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                    style={{
                      boxShadow:
                        '0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    CSS-Loaders
                  </Link>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}
