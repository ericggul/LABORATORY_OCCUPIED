import style from "./Square13.module.scss";
import { useState, useEffect, useCallback } from "react";

function Square13() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    return `rgba(${getRandom(0, 250)},${getRandom(200, 250)},${getRandom(
      200,
      210
    )}, 0.1)`;
  }, []);

  interface Props {
    width: number;
  }

  const Container = ({ width }: Props) => {
    const color = getColor();

    return (
      <div className={style.Boxcontainer}>
        <div
          className={style.intermediate}
          style={{
            display: "grid",
            transform: `rotate(${getRandom(-20, 30)}deg)`,
            gridTemplateColumns: `repeat(${Math.ceil(
              200 / width
            )}, ${width}vw)`,
            gridTemplateRows: `repeat(${Math.ceil(500 / width)}, ${width}vw)`,
          }}
        >
          {new Array(Math.ceil(100 / width) * Math.ceil(500 / width))
            .fill(0)
            .map((e, i) => (
              <div
                className={style.square}
                key={i}
                style={{
                  height: `${width}vw`,
                  width: `${width}vw`,
                  background: getColor(),
                  transform: `rotate(${getRandom(-5, 5)}deg)`,
                }}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className={style.whole}>
      {new Array(40).fill(0).map((e, i) => (
        <Container width={getRandom(11, 20)} key={i} />
      ))}
    </div>
  );
}

export default Square13;
