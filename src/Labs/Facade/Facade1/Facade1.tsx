import "./Facade1.scss";
import { useState, useEffect, useCallback } from "react";

function Facade1() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    const randomVal = getRandom(0, 50);
    return `rgb(${randomVal},${randomVal},${randomVal})`;
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

  const elArray = [64, 32, 16, 8, 4];

  return (
    <>
      {new Array(40).fill(0).map((e, i) => {
        const idx = Math.floor(getRandom(0, 4));
        return <Row elements={elArray[idx]} key={i} />;
      })}
    </>
  );
}

export default Facade1;
