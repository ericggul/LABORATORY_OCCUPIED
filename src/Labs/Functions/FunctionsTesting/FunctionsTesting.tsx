import style from "./FunctionsTesting.module.scss";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

function FunctionsTesting() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const quadraticFunction = (a: number, b: number) => {
    return getRandom(a, getRandom(a, b));
  };

  const tan = (width: number) => {
    return Math.tan(getRandom(-1.5, 1.5)) + width / 2;
  };

  interface ColorProps {
    color: number;
  }

  const Column = ({ color }: ColorProps) => {
    const getRandomColor = () => {
      return `hsl(${color}, ${getRandom(30, 70)}%, ${getRandom(30, 70)}%)`;
    };
    return (
      <div
        className={style.column}
        style={{
          position: "absolute",
          top: `${tan(20) * 5}%`,
          left: `${tan(20) * 5}%`,
          width: `0.5vw`,
          height: `0.5vw`,
          background: getRandomColor(),
        }}
      />
    );
  };

  const ColumnSet = () => {
    const color = getRandom(200, 300);
    return (
      <div className={style.set}>
        {new Array(500).fill(0).map((e, i) => (
          <Column color={color} key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(100).fill(0).map((e, i) => (
        <ColumnSet key={i} />
      ))}
    </div>
  );
}

export default FunctionsTesting;
