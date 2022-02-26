import style from "./Monet.module.scss";
import { useState, useEffect, useReducer, useMemo, useCallback } from "react";

function Monet() {
  const color_palette = [
    "7C8BA2",
    "88929E",
    "ACBFAC",
    "9DBBB9",
    "9AB0C5",
    "7691AE",
    "91A7B5",
    "7AA0C8",
  ];

  const [size, setSize] = useState({ height: 1000, width: 300 });

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getRandomColor = () => {
    const random = Math.floor(getRandom(0, 7));
    return `#${color_palette[random]}`;
  };

  const Container = () => {
    return (
      <div
        className={style.component}
        style={{
          background: `${getRandomColor()}`,
          opacity: `${getRandom(0.03, 0.1)}`,
          top: `${getRandom(-10, 100)}vh`,
          left: `${getRandom(-10, 100)}vw`,
        }}
      ></div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(500).fill(0).map((e, i) => (
        <Container />
      ))}
    </div>
  );
}

export default Monet;
