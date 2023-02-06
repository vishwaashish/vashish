import type { AppProps } from 'next/app'
// import "./../styles/index.css"
import "./globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}