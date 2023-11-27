import React from "react";

const Alert = (props) => {
  return (
    <div className={`${props.alert} ${props.alert_color}`}>{props.message}</div>
  );
};

export default Alert;
