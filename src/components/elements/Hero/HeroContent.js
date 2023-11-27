import React, { useEffect, useRef, useState } from "react";
import { textNamesForAnimataion } from "../../../constants/hero";
import styles from "./styles.module.scss";
//!this component related to zoom animation
const HeroContent = () => {
  const wordsRef = useRef(null);
  const [index, setIndex] = React.useState(0);
  const [zoomInSlides, setZoomInSlides] = React.useState(
    textNamesForAnimataion
  );
  useEffect(() => {
    const lastIndex = zoomInSlides.length - 1;
    if (index < 0) setIndex(lastIndex);

    if (index > lastIndex) setIndex(0);

    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > zoomInSlides.length - 1) index = 0;
        return index;
      });
    }, 3900);
    return () => {
      clearInterval(slider);
    };
  }, [index, zoomInSlides]);
  return (
    <div className={styles.hero_content}>
      <div className={styles.section_heading}>
        <h1 className={styles.section_title}>
          The best way to travel between Heathrow and Gatwick
        </h1>
        <h2 className={styles.section_title}>
          <span className={styles.words} ref={wordsRef}>
            {textNamesForAnimataion.map((text, Textindex) => {
              let stylesName = styles.is_hidden;
              if (Textindex === index)
                stylesName = styles.is_visible_animation_showcase_zoomin;
              return (
                <b
                  key={Textindex}
                  className={`${styles.is_hidden} ${stylesName ? stylesName : "ZOOM"
                    }`}
                >
                  {text.linkName}
                </b>
              );
            })}
          </span>
        </h2>
      </div>
    </div>
  );
};
export default HeroContent;
