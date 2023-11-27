import React, { useRef, useState } from "react";
import { headerLinkNames } from "../../../constants/header/index.js";
import styles from "./styles.module.scss";
import logoImage from '../../../../public/webpImages/logo.webp';
import Image from 'next/image'
const Header = () => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [activeClass, setActiveClass] = useState(false);
  const toggleMenu = (par) => {
    setActiveClass(!activeClass);
    navRef.current.style.setProperty(
      "--childenNumber",
      navRef.current.children.length
    );
    menuRef.current.classList.toggle(`${styles.menuActive}`);
  };
  return (
    <div className={styles.nav_container} id="navbar_container">
      <nav className={styles.nav}>
        <div className={styles.logoDiv}>
          <a href="/" className={styles.logo}>
            <Image
              src={logoImage}
              className={styles.logo_header}
              alt="Heathrow Gatwick Transfers Logo"
              layout="responsive"
              width={100}
              height={14}
              srcSet="(max-width: 768px) 600px 88px,"
            />
          </a>
        </div>

        {/*  */}
        <div className={styles.ulDiv}>
          <ul id="nav" className={`${styles.ul} ${activeClass ? styles.ulActive : "false"}`} ref={navRef}   >
            {headerLinkNames.map((item) => {
              return (
                <li key={item.id} className={styles.li_item}>
                  <a href={item.linkUrl} className={styles.item}>
                    {item.linkName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div onClick={toggleMenu} ref={menuRef} className={styles.menu} id="menu"  >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
      </nav >
    </div >
  );
};

export default Header;
