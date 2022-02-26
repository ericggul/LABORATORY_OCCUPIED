import style from "./Pow3.module.scss";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import classNames from "classnames";
import Dancin from "../../assets/Dancin.mp3";

function Pow3() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const quadraticFunction = (a: number, b: number) => {
    return getRandom(a, getRandom(a, b));
  };

  const centeredQuadratic = (center: number, min: number, max: number) => {
    return;
  };

  const test = (a: number, b: number) => {
    return Math.pow(getRandom(a, b), 3);
  };

  const getRandomColor = () => {
    return `hsl(200, ${getRandom(30, 70)}%, ${getRandom(30, 70)}%)`;
  };

  interface TopProps {
    top: number;
  }

  const Column = ({ top }: TopProps) => {
    const width = getRandom(0.2, 1.8);
    const height = 2 - width;

    return (
      <div
        className={style.column}
        style={{
          position: "absolute",
          top: `${test(0, 1) * 100 + top}vh`,
          left: `${test(0, 1) * 100 + top}vw`,
          width: `${width}vw`,
          height: `${height}vh`,
          background: getRandomColor(),
        }}
      />
    );
  };

  const ColumnSet = ({ top }: TopProps) => {
    return (
      <>
        {new Array(2000).fill(0).map((e, i) => (
          <Column key={i} top={top} />
        ))}
      </>
    );
  };

  return (
    <div className={style.container}>
      {new Array(10).fill(0).map((e, i) => (
        <ColumnSet top={i ** 2} key={i} />
      ))}
    </div>
  );
}

export default Pow3;
