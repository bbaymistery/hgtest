import React from "react";
import style from "./styles.module.scss";
const CustomError = () => {
  return (
    <div className={style.notfound_containerId}>
      {/* //notfound */}
      <div className={style.notfound}>
        <div className={style.notfounf404}>
          <h1>:(</h1>
        </div>
        <h2 className={style.h2}>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <a href="/">home page</a>
      </div>
    </div>
  );
};

export default CustomError;
