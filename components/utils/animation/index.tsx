export const transition = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.95,
    ease: [0.165, 0.84, 0.44, 1],
  },
  viewport: { once: true },
})
