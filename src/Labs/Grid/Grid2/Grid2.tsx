import "./Grid2.scss";
import { useState, useEffect } from "react";

function Grid2() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const Square = () => {
    return (
      <div
        className="square1"
        style={{
          background: `transparent`,
        }}
      />
    );
  };

  const Square2 = () => {
    return (
      <div
        className="square2"
        style={{
          background: `hsl(${getRandom(0, 300)}, 50%, 30%)`,
          boxShadow: `inset 0 0 1vw black`,
        }}
      />
    );
  };

  return (
    <>
      <div className="container1">
        {new Array(10000).fill(0).map((e, i) => (
          <Square key={i} />
        ))}
      </div>
      <div className="container2">
        {new Array(1600).fill(0).map((e, i) => (
          <Square2 key={i} />
        ))}
      </div>
    </>
  );
}

export default Grid2;
