import style from "./Circle9.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
  globalWidth: number;
}

interface GridProps {
  globalWidth: number;
}

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

function CircleGrid({ globalWidth }: GridProps) {
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

    return (
      <div
        className={style.comp}
        style={{
          width: `${globalWidth}vw`,
          height: `${globalWidth}vw`,
        }}
      >
        {new Array(200).fill(0).map((e, i) => {
          const getColor = () => {
            return `#${getHexRandom()}`;
          };
          const height = getRandom(globalWidth * 0, globalWidth * 0.6);

          return (
            <div
              className={style.square}
              style={{
                height: `${height}vw`,
                width: `${height}vw`,
                top: `${getRandom(0, globalWidth - height)}vw`,
                left: `${getRandom(0, globalWidth - height)}vw`,
                background: getColor(),
                opacity: `0.4`,
              }}
            />
          );
        })}
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

function Circle9() {
  return (
    <div className={style.whole}>
      {
        <>
          <CircleGrid globalWidth={20} />
        </>
      }
    </div>
  );
}

export default Circle9;
