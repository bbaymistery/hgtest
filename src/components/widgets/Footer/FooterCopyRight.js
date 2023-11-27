import React from "react";
import styles from "./styles.module.scss";
import paymentImg from '../../../../public/images/payment.png';
import Image from 'next/image'
const FooterCopyRight = () => {
  return (
    <div className={styles.sub_container}>
      <div className={styles.row2}>
        <div className={styles.col_8}>
          <p className={styles.copy__desc}>
            Copyright © 2021 Heathrow Gatwick Transfers
            <i className={`fa-solid fa-heart ${styles.icon}`}></i>
          </p>
        </div>

        <div className={styles.col_4}>
          <div className={styles.copy_right}>
            <h3 className={styles.copy_right_title}>We Accept</h3>
            {/* <img
              src="/images/payment.png"
              alt=""
              className={styles.copy_right_image}
            /> */}
            <div style={{ minWidth: '15%' }}>
              <Image
                src={paymentImg}
                className={styles.logo_header}
                alt="Heathrow Gatwick Transfers Payment"
                width={100}
                height={21}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyRight;
