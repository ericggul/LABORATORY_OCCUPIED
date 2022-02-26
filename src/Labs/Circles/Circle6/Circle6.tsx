import style from "./Circle6.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
  globalWidth: number;
}

interface GridProps {
  globalWidth: number;
}

function CircleGrid({ globalWidth }: GridProps) {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const Component = ({ i, globalWidth }: Props) => {
    const getHexRandom = useCallback(() => {
      const result = new Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      return result;
    }, []);
    const generateHex = useCallback((i: number) => {
      const initial = parseInt("0305b5", 16);
      return (initial + Math.floor(i / 100)).toString(16);
    }, []);
    const getColor = useCallback(() => {
      return `#${getHexRandom()}`;
    }, []);
    const height = getRandom(globalWidth * 0.1, globalWidth * 0.9);

    return (
      <div
        className={style.comp}
        style={{
          width: `${globalWidth}vw`,
          height: `${globalWidth}vw`,
        }}
      >
        <div
          className={style.square}
          style={{
            height: `${height}vw`,
            width: `${height}vw`,
            top: `${globalWidth / 2 - height / 2}vw`,
            left: `${globalWidth / 2 - height / 2}vw`,
            border: `1px solid ${getColor()}`,
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={style.container}
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(
          100 / globalWidth
        )},${globalWidth}vw)`,
        gridTemplateRows: `repeat(${Math.ceil(
          500 / globalWidth
        )},${globalWidth}vw)`,
      }}
    >
      {new Array(Math.ceil(100 / globalWidth) * Math.ceil(500 / globalWidth))
        .fill(0)
        .map((e, i) => (
          <Component i={i} globalWidth={globalWidth} key={i} />
        ))}
    </div>
  );
}

function Circle6() {
  const radiusArray = [
    3.1, 3.7, 4.1, 4.3, 4.7, 5.3, 5.9, 6.1, 6.7, 7.1, 7.3, 7.9, 8.3, 8.9, 9.7,
    10.1, 10.3, 10.7, 10.9, 11.3, 11.7, 12.7, 12.9,
  ];

  return (
    <div className={style.whole}>
      {radiusArray.map((r, i) => (
        <CircleGrid
          globalWidth={radiusArray[radiusArray.length - 1 - i]}
          key={i}
        />
      ))}
    </div>
  );
}

export default Circle6;
