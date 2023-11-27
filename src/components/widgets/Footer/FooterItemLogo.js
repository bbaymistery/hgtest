import React from "react";
import styles from "./styles.module.scss";
import logoImage from '../../../../public/images/logo.png';
import Image from 'next/image'
const FooterItemLogo = () => {
  return (
    <div className={styles.footer_item}>
      <div className={styles.footer_logo}>
        <span href="" className={styles.footer_logo_link}>
          {/* <img
            src="/images/logo.png"
            alt=""
            className={styles.footer_logo_link_img}
          /> */}
          <Image
            src={logoImage}
            className={styles.logo_header}
            alt="Heathrow Gatwick Transfers Logo"
            width={300} height={42} layout="responsive"
          />
        </span>
      </div>
      <p className={styles.footer_desc}>
        HGT (Heathrow Gatwick Transfers) is London based company specialising in
        Airports and Cruise terminal transfers. We provide airport and seaport
        taxi services to or from any destination in the UK
      </p>
      <p className={styles.footer_desc}>
        +44 208 683 2330
        <br />
      </p>

      <a className={styles.footer_desc} href="mailto: info@heathrow-gatwick-transfers.com" target="_blank"> info@heathrow-gatwick-transfers.com</a>
    </div>
  );
};

export default FooterItemLogo;
