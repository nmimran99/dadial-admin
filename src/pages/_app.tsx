import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { ModalContextProvider } from '@/contexts/modalContext'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ModalContextProvider>
        <Layout>
          <Component className="rtl" {...pageProps} />
        </Layout>
      </ModalContextProvider>
      
    </SessionProvider>)
}

