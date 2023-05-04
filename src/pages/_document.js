import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
    <Head>
    <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css`} />
      
    </Head>
       
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
