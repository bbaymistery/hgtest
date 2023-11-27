import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
const Accordion = ({ title, content, toggleState, active, setAcTIVE }) => {
  const [heightEl, setHeightEl] = useState();
  const refHeight = useRef();

  useEffect(() => {
    // console.log(refHeight.current.scrollHeight);
    setHeightEl(`${refHeight.current.scrollHeight}px`);
  }, []);

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordion_heading}
        onClick={() => toggleState(title)}
      >
        <div
          className={styles.accordion_heading_content}
          onClick={() => toggleState(title)}
        >
          <p className={styles.head_title}>{title}</p>
          <span
            className={`${styles.headClick} ${
              active === title ? styles.turnUp : ""
            }`}
            onClick={() => toggleState(title)}
          >
            <i className="fa-solid fa-angle-down"></i>
          </span>
        </div>
      </div>

      {/* //!content */}
      <div
        className={
          active === title
            ? `${styles.accordion_toggle} ${styles.animated}`
            : `${styles.accordion_toggle}`
        }
        style={{ height: active === title ? `${heightEl}` : "0px" }}
        ref={refHeight}
      >
        {content?.map((c, i) => {
          return (
            <p key={i}>
              <span>{i > 0 ? `${i}.` : ""}</span>
              {c}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
