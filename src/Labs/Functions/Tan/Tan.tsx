import style from "./Tan.module.scss";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

function Tan() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const quadraticFunction = (a: number, b: number) => {
    return getRandom(a, getRandom(a, b));
  };

  const tan = (width: number) => {
    return Math.tan(getRandom(-1.57, 1.57)) + width / 2;
  };

  const getRandomColor = () => {
    return `hsl(200, ${getRandom(30, 70)}%, ${getRandom(30, 70)}%)`;
  };

  interface TopProps {
    top: number;
  }

  interface SquareProps {
    color: any;
  }

  const Column = ({ color }: SquareProps) => {
    const getRandomColor = () => {
      return `hsl(${color}, ${getRandom(30, 70)}%, ${getRandom(30, 70)}%)`;
    };

    console.log(color);

    return (
      <div
        className={style.column}
        style={{
          position: "absolute",
          top: `${tan(100)}vh`,
          left: `${tan(100)}vw`,
          width: `${0.5}vw`,
          height: `${0.5}vh`,
          background: getRandomColor(),
        }}
      />
    );
  };

  const ColumnSet = ({ color }: SquareProps) => {
    return (
      <>
        {new Array(500).fill(0).map((e, i) => (
          <Column color={color} key={i} />
        ))}
      </>
    );
  };

  return (
    <div className={style.container}>
      {new Array(100).fill(0).map((e, i) => (
        <ColumnSet color={200 + i} key={i} />
      ))}
    </div>
  );
}

export default Tan;
