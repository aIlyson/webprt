import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      {/* TODO: tenho que lembrar de reformular isso aqui que se não for assim ele vai dar erro */}
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Alysson Michel" />
        <meta
          name="description"
          content="Hi, I'm Alysson Michel, a web developer sharing my experiences, challenges, and programming tips ."
        />
        <meta property="og:title" content="Alysson Michel - Personal Page" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allysonms.tech" />
        <meta property="og:site_name" content="Alysson Michel's Portfolio" />
        <link rel="canonical" href="https://allysonms.tech" />
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
        <link rel="icon" href="../../icon.png" type="image/png" />
        <link
          rel="preload"
          href="/staticImagesha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==.webp"
          as="image"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
