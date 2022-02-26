import "./Grid7.scss";
import { useState, useEffect } from "react";

function Grid7() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const Square = () => {
    return (
      <div
        className="squareOne"
        style={{
          background: "transparent",
          boxShadow: `0 0 1vw white`,
        }}
      />
    );
  };

  const Square2 = () => {
    return (
      <div
        className="squareTwo"
        style={{
          background: "transparent",
          boxShadow: `inset 0 0 3vw white`,
        }}
      />
    );
  };

  interface Props {
    width: number;
  }

  const Container = ({ width }: Props) => {
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
                boxShadow: `inset 0 0 ${width * getRandom(0.1, 0.2)}vw white`,
              }}
            />
          ))}
      </div>
    );
  };

  return (
    <>
      <Container width={5.1} />
      <Container width={3.1} />

      <Container width={3.7} />
      <Container width={7.1} />
      <Container width={11.1} />
      <Container width={6.1} />
    </>
  );
}

export default Grid7;
