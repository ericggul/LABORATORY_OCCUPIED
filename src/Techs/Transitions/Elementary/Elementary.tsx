import style from "./Elementary.module.scss";
import { useState, useEffect } from "react";

function Elementary() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
  };

  const Component = () => {
    return <div className={style.comp}></div>;
  };

  return (
    <div className={style.container}>
      {new Array(4000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Elementary;
