import style from "./TanH.module.scss";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import classNames from "classnames";
import Dancin from "../../assets/Dancin.mp3";

function TanH() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const quadraticFunction = (a: number, b: number) => {
    return getRandom(a, getRandom(a, b));
  };

  const tanH = (a: number, b: number) => {
    return (Math.tanh(getRandom(-5, 5)) * 0.5 + 0.5) * (b - a) + a;
  };

  const getRandomColor = () => {
    return `hsl(200, ${getRandom(30, 70)}%, ${getRandom(30, 70)}%)`;
  };

  interface TopProps {
    top: number;
  }

  interface SquareProps {
    size: any;
  }

  const Column = ({ size }: SquareProps) => {
    const width = getRandom(0.2, 1.8);
    const height = 2 - width;

    return (
      <div
        className={style.column}
        style={{
          position: "absolute",
          top: `${tanH(0, size.height) + 50 - size.height / 2}vh`,
          left: `${tanH(0, size.width) + 50 - size.width / 2}vw`,
          width: `${width}vw`,
          height: `${height}vh`,
          background: getRandomColor(),
        }}
      />
    );
  };

  const ColumnSet = ({ size }: SquareProps) => {
    return (
      <>
        {new Array(500).fill(0).map((e, i) => (
          <Column size={{ width: size.width, height: size.height }} key={i} />
        ))}
      </>
    );
  };

  return (
    <div className={style.container}>
      {new Array(10).fill(0).map((e, i) => (
        <ColumnSet
          size={{ width: getRandom(0, 90), height: getRandom(0, 90) }}
          key={i}
        />
      ))}
    </div>
  );
}

export default TanH;
