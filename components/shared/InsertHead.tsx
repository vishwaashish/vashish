import Head from 'next/head'
import React, { FC } from 'react'

interface InsertHead {
  title: string
  description: string
}
const InsertHead: FC<InsertHead> = ({ title, description }) => {
  return (
    <>
      <Head>
        {title && (
          <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:card" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default InsertHead
