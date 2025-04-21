import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      {/* TODO: tenho que lembrar de reformular isso aqui que se não for assim ele vai dar erro */}
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Allyson Michel" />
        {/* <title>Allyson Michel</title> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="../../icon.ico" type="image/png" />
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="Sonho de desenvolvedor" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
