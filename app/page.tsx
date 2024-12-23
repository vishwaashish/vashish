"use client";
import { gradient } from "@/components/Gradient";
import Headers from "@/components/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const RelatedProject = dynamic(
    async () => import("@/components/projects/related/RelatedProject"),
    {
        ssr: false,
    },
);

export default function Home() {
    useEffect(() => {
        gradient.initGradient("#gradient-canvas");
    }, []);

    return (
        <>
            {/* <AnimatePresence> */}
            <div className="relative font-inter ">
                <motion.canvas
                    initial={{
                        filter: "blur(2px)",
                    }}
                    animate={{
                        filter: "blur(0px)",
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    id="gradient-canvas"
                    data-transition-in
                    className="absolute top-0 h-full z-0 w-full"
                ></motion.canvas>

                <div
                    className=" "
                    style={{
                        background: "#94c8ff",
                        backgroundImage:
              "linear-gradient(145deg, #bde1ff, #6ca0f4, #e2d8ee,#94c8ff)",
                    }}
                >
                    <Headers mode="dark" />
                    <main
                        className="flex justify-center flex-col max-w-[1200px] mx-auto  w-full px-4 "
                        style={{
                            minHeight: "calc(100dvh - 39px )",
                        }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.15,
                                duration: 0.95,
                                ease: [0.165, 0.84, 0.44, 1],
                            }}
                            className="text-[#020817] relative mb-[15px] md:ml-[-10px] md:mb-[37px] font-extrabold text-[14vw] md:text-[100px] lg:text-[110px]  font-inter  leading-[0.9] tracking-[-2px] z-1"
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
                                <p className="font-normal max-w-[900px] text-[#020817]  md:text-lg   ">
                  Passionate about crafting digital experiences with a keen eye
                  for design and a deep love for coding, I bring creative
                  solutions to life through the web. Let&apos;s build something
                  amazing together!
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
                                className="text-left  z-20  mt-1  md:mb-[35px] "
                            >
                                <Button variant={"secondary"} className="">
                  Star on Github
                                </Button>
                                {/* <Link
                    href="https://github.com/vishwaashish/vashish"
                    target="_blank"
                    className="pl-[8px] min-w-[180px]   bg-[#1E2B3A] text-white btn btn-site  scale-100 border-0"
                  >
                    Star on Github
                  </Link> */}
                            </motion.div>
                        </div>
                    </main>
                </div>
            </div>
            {/* </AnimatePresence> */}
            <br />
            <br />

            <RelatedProject type="tool" />
            <RelatedProject type="project" />
        </>
    );
}
