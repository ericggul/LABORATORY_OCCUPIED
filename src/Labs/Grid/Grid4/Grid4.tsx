import "./Grid4.scss";
import { useState, useEffect } from "react";

function Grid4() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const Square = () => {
    return (
      <div
        className="squareOne"
        style={{
          background: `hsl(${getRandom(0, 300)}, 50%, 70%)`,
          opacity: `${getRandom(0, 1)}`,
        }}
      />
    );
  };

  const Square2 = () => {
    return (
      <div
        className="squareTwo"
        style={{
          background: `hsl(${getRandom(0, 300)}, 50%, 30%)`,
        }}
      />
    );
  };

  return (
    <>
      <div className="containerOne">
        {new Array(10000).fill(0).map((e, i) => (
          <Square key={i} />
        ))}
      </div>
      <div className="containerTwo">
        {new Array(1600).fill(0).map((e, i) => (
          <Square2 key={i} />
        ))}
      </div>
    </>
  );
}

export default Grid4;
