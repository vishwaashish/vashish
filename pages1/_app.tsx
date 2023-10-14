import Footer from '@/components/footer'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import './globals.css'
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Headers /> */}
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
