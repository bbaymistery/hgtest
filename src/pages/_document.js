import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    let pageProps = null;
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          pageProps = props.pageProps;
          return <App {...props} />
        },
        enhanceComponent: (Component) => Component,
      })
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, pageProps }
  }

  render() {
    const { pageProps } = this.props;

    let {
      title = "The best way to travel between Heathrow to Gatwick | Gatwick airport to Heathrow transfer and transportation",
      description = "Heathrow to Gatwick and Gatwick to Heathrow transfer prices.  Heathrow airport and Gatwick travel and transportation information. How do i get from heathrow to gatwick.",
      keywords = "Heathrow to Gatwick,gatwick to heathrow,heathrow to Gatwick travel,Gatwick to Heathrow travel,Gatwick to Heathrow transfer,Heathrow to Gatwick transfer.",
    } = (typeof pageProps === 'object' && typeof pageProps.head === 'object') ? pageProps.head : {};

    let extraTags = typeof pageProps.head === 'object' && Array.isArray(pageProps.head.extraTags) ? pageProps.head.extraTags : []
    if (typeof pageProps.head === 'object') {
      delete pageProps.head.extraTags
    }

    return (
      <Html>
        <Head >
          <title>{"title"}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-54500Y5330" strategy='beforeInteractive' />
          <Script strategy='beforeInteractive'>{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-54500Y5330');
            `}</Script>
          {extraTags.map((tag, i) => {
            let { attr, name, textContent } = tag;
            if (name === 'link') {
              return <link key={i} {...attr} />
            } else if (name === 'script') {
              let { type, data } = typeof textContent === 'object' ? textContent : {};
              if (type === 'object') {
                return <Script key={i} {...attr} strategy='beforeInteractive' >{JSON.stringify(data, null, 2)}</Script>
                //{JSON.stringify(data, null, 2)}
              } else if (type === 'string') {
                return <Script key={i} {...attr} strategy='beforeInteractive' >{data}</Script>
              } {
                return <React.Fragment key={i}></React.Fragment>
              }
            } else {
              return <React.Fragment key={i}></React.Fragment>
            }
          })}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument;