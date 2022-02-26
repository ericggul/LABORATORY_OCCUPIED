import style from "./Circle2.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

interface CompProps {
  i: number;
  globalWidth: number;
}

function Circle2() {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const Component = ({ i, globalWidth }: CompProps) => {
    const x = i % 40;
    const y = Math.ceil(i / 40);
    var deleted = false;

    if (11 < x && x < 18 && 5 < y && y < 12) {
      deleted = true;
    }

    const getHexRandom = useCallback(() => {
      const result = new Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      console.log(result);
      return result;
    }, []);
    const generateHex = useCallback((i: number) => {
      const initial = parseInt("0305b5", 16);
      return (initial + Math.floor(i / 100)).toString(16);
    }, []);
    const getColor = useCallback(() => {
      return `#${getHexRandom()}`;
    }, []);

    const height2 = getRandom(globalWidth * 0.2, globalWidth * 0.7);
    const height = getRandom(height2 + 0.1, globalWidth - 0.1);
    const color = i % 40 < 20 ? "white" : getColor();
    return (
      <div
        className={style.comp}
        style={{
          height: `${globalWidth}vw`,
          width: `${globalWidth}vw`,
        }}
      >
        {!deleted && (
          <>
            <div
              className={style.circle}
              style={{
                height: `${height}vw`,
                width: `${height}vw`,
                top: `${globalWidth / 2 - height / 2}vw`,
                left: `${globalWidth / 2 - height / 2}vw`,
                background: getColor(),
              }}
            />
            <div
              className={style.circle}
              style={{
                height: `${height2}vw`,
                width: `${height2}vw`,
                top: `${globalWidth / 2 - height2 / 2}vw`,
                left: `${globalWidth / 2 - height2 / 2}vw`,
                background: getColor(),
              }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(8000).fill(0).map((e, i) => (
        <Component i={i} globalWidth={2.5} key={i} />
      ))}

      <div
        style={{
          position: "absolute",
          top: `${2.5 * 5}vw`,
          left: `${2.5 * 12}vw`,
        }}
      >
        <Component i={1} globalWidth={15} />
      </div>
    </div>
  );
}

export default Circle2;
