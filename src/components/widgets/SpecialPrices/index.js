import React from "react";
import styles from "./styles.module.scss";
import { specialPriceConst } from "../../../constants/specialPrices";
import LogoJpgImage from '../../../../public/images/logoJpg.png'
import Image from 'next/image'

const SpecialPrices = () => {
  return (
    <div className={`${styles.special_container} scContent`}>
      <h1 className={styles.special_title}>Special Prices</h1>
      <div className={styles.container}>
        <div className={styles.content}>
          {specialPriceConst.map((item, i) => {
            return (
              <a className={styles.card_content} key={i} href={item.linkUrl}>
                <div className={styles.top_card}>
                  <div className={styles.pickUp}>
                    <h2>
                      <span className={styles.from}>From</span> {item.h1}{" "}
                    </h2>
                    <p className={styles.desc}>{`(${item.abr1})`}</p>
                  </div>
                  <div className={styles.logo}>
                    {/* <img
                      // style={{ width: "120px" }}
                      src="/images/logoJpg.png"
                          className={styles.img}
                      alt=""
                    /> */}

                    <div className={styles.responsiveIamgeDiv} >
                      <Image
                        src={LogoJpgImage}
                        className={styles.img}
                        alt={"Heathrow Gatwick Transfers Logo"}
                        width={170} height={170} layout="responsive"
                      />
                    </div>
                  </div>
                </div>
                <p className={styles.duration}>{item.duration}</p>

                <div className={styles.line}>
                  <div className={styles.left_lineDot}>
                    <div className={styles.lineDot}></div>
                  </div>
                  <div className={styles.icon_car}>
                    <i className={`fa-solid fa-car-side ${styles.car_icon}`}   ></i>
                  </div>
                  <div className={styles.right_lineDot}>
                    <div className={styles.rightDot}></div>
                  </div>
                </div>

                <div className={styles.bottom_card}>
                  <div className={styles.price_text}>
                    <h2 className={styles.span_text}>Start from</h2>{" "}
                    <p className={styles.span_price}>£{item.price}</p>
                  </div>

                  <div className={styles.dropOff}>
                    <h2 className={styles.dropOff_text}>
                      <span className={styles.to}>To</span> {item.h11}
                    </h2>
                    <p className={styles.dropOff_desc}>{`(${item.abr2})`}</p>
                    <div className={styles.button_div}>
                      <button>Book Now</button>
                    </div>
                    {/* <div className={styles.book_now}>Book Now</div> */}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecialPrices;
/*
    // if (
    //   769 > document.documentElement.clientWidth &&
    //   676 <= document.documentElement.clientWidth &&
    //   selectSpeciialPriceState === true
    // ) {
    //   window.scroll({
    //     top: 2650,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // } else
*/
