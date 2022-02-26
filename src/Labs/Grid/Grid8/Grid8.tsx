import "./Grid8.scss";
import { useState, useEffect, useCallback } from "react";

function Grid8() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    return `rgb(${getRandom(100, 250)},${getRandom(100, 250)},${getRandom(
      100,
      200
    )})`;
  }, []);

  interface Props {
    width: number;
  }

  const Container = ({ width }: Props) => {
    const color = getColor();
    const rotated = () => {
      return Math.random() < 0.2;
    };
    return (
      <div
        className="Boxcontainer"
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(100 / width)}, ${width}vw)`,
          gridTemplateRows: `repeat(${Math.ceil(500 / width)}, ${width}vw)`,
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
                boxShadow: `0 0 ${width * 0.1}vw ${color}`,
                transform: `${rotated() && `rotate(${getRandom(-10, 10)}deg)`}`,
                opacity: `${rotated() && 0.3}`,
              }}
            />
          ))}
      </div>
    );
  };

  return (
    <>
      <Container width={15.1} />
      <Container width={13.1} />

      <Container width={13.7} />
      <Container width={17.1} />
      <Container width={11.1} />
      <Container width={16.1} />
    </>
  );
}

export default Grid8;
