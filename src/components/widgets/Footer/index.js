import React from "react";
import {
  companyLinksName,
  row2TermsPrivacyHelp,
  socialIconss,
  socialLinks,
} from "../../../constants/footer";
import FooterCopyRight from "./FooterCopyRight";
import FooterItem from "./FooterItem";
import FooterItemLogo from "./FooterItemLogo";
import FooterItemSubscribe from "./FooterItemSubscribe";
import styles from "./styles.module.scss";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container_main}>
        {/* first row */}
        <div className={styles.row1}>
          {/* //here is logo  */}
          <div className={styles.col_3}>
            <FooterItemLogo />
          </div>
          <div className={styles.col_3}>
            <FooterItem titleName="Company" linkNames={companyLinksName} />
          </div>
          <div className={styles.col_3}>
            <div className={styles.footer_item}>

              <h3 className={styles.title} data-text="curvs">
                {"Other Links"}
              </h3>
              <ul className={styles.list_items}>
                {/* <li className={styles.item}>
                  <a href="/about" className={styles.item_link}>
                    About
                  </a>
                </li> */}
                <li className={styles.item}>
                  <a href="/sitemap" className={styles.item_link}>
                    Site Map
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.col_3}>
            <FooterItemSubscribe />
          </div>
        </div>

        {/* second row */}
        <div className={styles.row2}>
          <div className={styles.col_8}>
            <FooterItem linkNames={row2TermsPrivacyHelp} />
          </div>

          {/* <div className={styles.col_4}>
            <div className={styles.footer_item}>
              <FooterItem withImage={true} linkNames={socialIconss} />
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.section_line}></div>
      <FooterCopyRight />
    </div>
  );
};

export default Footer;
