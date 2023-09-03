import type { AppProps } from 'next/app'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Headers from '@/components/header'
import Footer from '@/components/footer'
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Headers />
      <Component className="relative" {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: 'hsl(var(--b1))',
            color: '(var(--bc))',
          },
        }}
      />
      <Footer />
    </>
  )
}
