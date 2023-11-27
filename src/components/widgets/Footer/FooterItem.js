import React from "react";
import styles from "./styles.module.scss";
const FooterItem = (props) => {
  const { linkNames, titleName, withImage } = props;
  return (
    <div className={styles.footer_item}>
      {titleName && (
        <h3 className={styles.title} data-text="curvs">
          {titleName}
        </h3>
      )}
      <ul className={styles.list_items}>
        {linkNames.map((item) => {
          return (
            <li key={item.id} className={styles.item}>
              {withImage ? (
                <a href={item.linkUrl} className={styles.item_link}>
                  <img src={item.linkName} className={styles.img} alt="" />
                </a>
              ) : (
                <a href={item.linkUrl} className={styles.item_link}>
                  {item.linkName}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterItem;
