import React from "react";
import style from "./Moi.module.scss";

function Moi() {
  const component = (
    <div className={style.box}>
      <div className={style.text}>MOI#AVEC#TU</div>
    </div>
  );

  return (
    <div className={style.App}>
      {component}
      {component}
      {component}
      {component}
      {component}
      {component}
      {component}
    </div>
  );
}

export default Moi;
