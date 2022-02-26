import style from "./Persian.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Persian() {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const Component = ({ i }: Props) => {
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

    var heights = [];
    heights.push(0.1);
    for (var i = 0; i < 45; i++) {
      heights.push(getRandom(heights[i] + 0.2, 0.5 + i * 0.2));
    }

    return (
      <div
        className={style.comp}
        // style={{
        //     background: getColor(),
        // }}
      >
        {heights &&
          heights.map((height, i) => (
            <div
              className={style.circle}
              style={{
                height: `${10 - height}vw`,
                width: `${10 - height}vw`,
                top: `${height / 2}vw`,
                left: `${height / 2}vw`,
                background: getColor(),
                opacity: i / 60,
              }}
              key={i}
            />
          ))}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(500).fill(0).map((e, i) => (
        <Component i={i} key={i} />
      ))}
    </div>
  );
}

export default Persian;
