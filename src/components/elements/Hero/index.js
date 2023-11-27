import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import HeroContent from "./HeroContent";
import OneWay from "./OneWay/OneWay";
import Return from "./Return/Return";
import {
  getAppData,
  switchJourneyType,
} from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectedJourneyType } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
//when ever i will want to use this content with spesific classnames i will send props
const Hero = ({ isHeroContentActive, isBgImageActive }) => {
  const [activeTabContent, setActiveTabContent] = useState("One Way");
  const selectJourneyType = useSelector(selectedJourneyType)
  const dispacth = useDispatch();
  const changeActive = (e, name) => {
    e.preventDefault();
    setActiveTabContent(name);
    if (name === "One Way") {
      dispacth(switchJourneyType(0));
    } else {
      dispacth(switchJourneyType(1));
    }
  };

  useEffect(() => {
    dispacth(getAppData());
    // console.log(document.documentElement.clientWidth);
    if (500 > document.documentElement.clientWidth) {
      window.scrollTo({
        top: 156,
        left: 0,
        behavior: "smooth",
      });
    }
    dispacth(switchJourneyType(0));
  }, []);

  return (
    <div className={styles.hero_wrapper}>
      <div className={`${styles.hero_box}   ${!isBgImageActive ? styles.hero : ""} `}  >
        <span className={`${styles.line} ${styles.line_bg1}`}></span>
        <span className={`${styles.line} ${styles.line_bg2}`}></span>
        <span className={`${styles.line} ${styles.line_bg3}`}></span>
        <span className={`${styles.line} ${styles.line_bg4}`}></span>
        <span className={`${styles.line} ${styles.line_bg5}`}></span>
        <span className={`${styles.line} ${styles.line_bg6}`}></span>
        <div className={styles.containerr}>
          <div className={styles.content}>
            {isHeroContentActive ? <HeroContent /> : ""}
            <div className={styles.sectiontab_content}>
              <ul className={styles.section_tab}>
                {/* //! one way button */}
                <li className={styles.navItem} onClick={(e) => changeActive(e, "One Way")}   >
                  <span className={`${styles.navLink} ${activeTabContent === "One Way" ? styles.active : ""}`}   >
                    <i className={`fa-solid fa-arrow-right-long ${styles.icon}  `}   ></i>
                    One Way
                  </span>
                </li>
                {/* //!return  button */}
                <li className={styles.navItem} onClick={(e) => changeActive(e, "Return")}    >
                  <span className={`${styles.navLink} ${activeTabContent === "Return" ? styles.active : ""}`}  >
                    <i className={`fa fa-exchange ${styles.icon}`}></i>
                    Return
                  </span>
                </li>
              </ul>
            </div>
            {activeTabContent === "One Way" ? <OneWay /> : <Return />}
          </div>
        </div>
        <svg
          className={styles.hero_svg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path d="M0 10 0 0 A 90 59, 0, 0, 0, 100 0 L 100 10 Z"></path>
        </svg>
      </div>
    </div>
  );
};
export default Hero;
