import style from "./Circle3.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Circle3() {
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
    heights.push(getRandom(0, 0.5));
    for (var i = 0; i < 13; i++) {
      heights.push(getRandom(heights[i] + 0.1, 0.5 + i * 0.3));
    }

    console.log(heights);

    return (
      <div
        className={style.comp}
        style={{
          background: getColor(),
        }}
      >
        {heights &&
          heights.map((height, i) => (
            <div
              className={style.circle}
              style={{
                height: `${5 - height}vw`,
                width: `${5 - height}vw`,
                top: `${height / 2}vw`,
                left: `${height / 2}vw`,
                background: getColor(),
              }}
              key={i}
            />
          ))}

        {/* <div className={style.circle} 
                    style={{
                        height: `${h2}vw`,
                        width: `${h2}vw`,
                        top: `${2.5-h2/2}vw`,
                        left: `${2.5-h2/2}vw`,
                        background: getColor(),
                    }}
                />
                <div className={style.circle} 
                    style={{
                        height: `${h1}vw`,
                        width: `${h1}vw`,
                        top: `${2.5-h1/2}vw`,
                        left: `${2.5-h1/2}vw`,
                        background: getColor(),
                    }}
                /> */}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(2000).fill(0).map((e, i) => (
        <Component i={i} key={i} />
      ))}
    </div>
  );
}

export default Circle3;
