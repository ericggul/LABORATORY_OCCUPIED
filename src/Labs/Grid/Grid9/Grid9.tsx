import "./Grid9.scss";
import { useState, useEffect, useCallback } from "react";

function Grid9() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };
  const DARK_RED = "rgb(46, 8, 8)";

  const getColor = useCallback(() => {
    const randomVal = getRandom(0, 20);
    const probability = Math.random() < 0.01;
    return probability
      ? DARK_RED
      : `rgb(${randomVal},${randomVal},${randomVal})`;
  }, []);

  interface Props {
    elements: number;
  }

  const Row = ({ elements }: Props) => {
    return (
      <div className="row">
        {new Array(elements).fill(0).map((e, i) => (
          <div
            className="element"
            style={{
              width: `${100 / elements}vw`,
              background: getColor(),
            }}
            key={i}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <>
      {new Array(40).fill(0).map((e, i) => {
        return <Row elements={Math.floor(getRandom(8, 30))} key={i} />;
      })}
    </>
  );
}

export default Grid9;
