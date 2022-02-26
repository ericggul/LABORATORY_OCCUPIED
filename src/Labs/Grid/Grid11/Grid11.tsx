import "./Grid11.scss";
import { useState, useEffect, useCallback } from "react";

function Grid11() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    return `rgb(${getRandom(150, 250)},${getRandom(200, 250)},${getRandom(
      200,
      210
    )})`;
  }, []);

  interface Props {
    width: number;
  }

  const Container = ({ width }: Props) => {
    const color = getColor();

    return (
      <div
        className="BoxcontainerG"
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(200 / width)}, ${width}vw)`,
          gridTemplateRows: `repeat(${Math.ceil(500 / width)}, ${width}vw)`,
          marginTop: `${getRandom(-50, 0)}vw`,
          marginLeft: `${getRandom(-50, 0)}vw`,
        }}
      >
        {new Array(Math.ceil(100 / width) * Math.ceil(500 / width))
          .fill(0)
          .map((e, i) => (
            <div
              className="square"
              key={i}
              style={{
                height: `${width}vw`,
                width: `${width}vw`,
                background: "transparent",
                boxShadow: `0 0 ${width * 0.02}vw ${color}`,
              }}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="thekingofwhole">
      {new Array(40).fill(0).map((e, i) => (
        <Container width={getRandom(11, 20)} key={i} />
      ))}
    </div>
  );
}

export default Grid11;
