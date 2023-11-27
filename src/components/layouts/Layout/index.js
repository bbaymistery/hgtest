import Head from "next/head";
import styles from "./styles.module.scss";
import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";
import React, { useEffect } from "react";
const Layout = ({
  children,
  title = "The best way to travel between Heathrow to Gatwick | Gatwick airport to Heathrow transfer and transportation",
  noFooter,
  description = "Heathrow to Gatwick and Gatwick to Heathrow transfer prices.  Heathrow airport and Gatwick travel and transportation information. How do i get from heathrow to gatwick.",
  keywords = "Heathrow to Gatwick,gatwick to heathrow,heathrow to Gatwick travel,Gatwick to Heathrow travel,Gatwick to Heathrow transfer,Heathrow to Gatwick transfer.",
}) => {
  useEffect(() => {
    document.documentElement.setAttribute("lang", 'en');
  }, [])

  return (
    <div className={styles.container_layout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="Safe For Kids" />
        <meta name="robots" content="index,follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <meta httpEquiv="X-UA-Compatible" content="IE=10" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
        <meta name="author" content="Heathrow Gatwick Transfers Ltd" />
        <meta name="copyright" content="Heathrow Gatwick Transfers Ltd" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 " />
        {/* <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="initial-scale=1" />
        <meta name="viewport" content="maximum-scale=1" /> */}

        <meta name="google-site-verification" content="9niN--Hxw6fLfS5Om0lK1dGEvoDbwo-ZTxjamC9oz64" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" media="all" />
        <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
        <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,300;1,400&display=swap" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Header />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
