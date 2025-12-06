// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html data-theme="light">
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Get theme from localStorage, default to light
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = 'light';
                  localStorage.setItem('theme', 'light');
                }
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
