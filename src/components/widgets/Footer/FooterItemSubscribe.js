import React from "react";
import styles from "./styles.module.scss";

const FooterItemSubscribe = () => {
  return (
    <div className={styles.footer_item}>
      <h3 className={styles.title} data-text="curvs">
        Subscribe Now
      </h3>

      <p className={styles.footer_desc}>
        Subscribe for latest updates & promotions
      </p>

      <div className={styles.contact_form}>
        <form action="" className={styles.form}>
          <div className={styles.input_box}>
            <p className={styles.label_text}>Enter email address</p>

            <div className={styles.form_group}>
              <span className={styles.mail_div}>
                <i
                  className={`fa-solid fa-envelope ${styles.mail_div_icon}`}
                ></i>
              </span>
              <input
                className={styles.form_control}
                // type="email"
                name="email"
                placeholder="Email address"
              />
              <p className={styles.btn}>Go</p>
              <span className={styles.form_desc}>
                <i className={`fa-solid fa-lock  ${styles.info_icon}`}></i>
                Your information is safe with us.
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FooterItemSubscribe;
