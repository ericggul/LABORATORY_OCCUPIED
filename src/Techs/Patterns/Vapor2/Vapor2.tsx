import style from "./Vapor2.module.scss";
import { useState, useEffect } from "react";

function Vapor2() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
  };

  const Component = () => {
    return (
      <div
        className={style.comp}
        style={{
          top: `${getRandom(0, 80)}vh`,
          left: `${getRandom(-10, 90)}vw`,
          background: `hsl(${getRandom(0, 255)},30%, 35%)`,
        }}
      />
    );
  };

  return (
    <div className={style.container}>
      {new Array(300).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Vapor2;
