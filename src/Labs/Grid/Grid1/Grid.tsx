import "./Grid.scss";
import { useState, useEffect } from "react";

function Grid() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const createNode = () => {
    const n = document.createElement("div");
    n.className = "element";
    n.setAttribute(
      "style",
      `   
            position: absolute;
            width: 20px;
            height: 20px;
            background: hsl(0,100%, 50%);
            boxShadow: -20vw 20vh 1vh hsl(50,40%, 70%);
            filter: drop-shadow(10vw 20vh 1vh rgb(160, 0, 210)) blur(20px);
            border-radius: 50%;
            top: ${getRandom(-10, 100)}vh;
            left: ${getRandom(-10, 100)}vw;
        `
    );
    document.body.appendChild(n);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createNode();
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const Element = () => {
    return (
      <div
        className="element"
        style={{
          background: `hsl(0,100%, 50%)`,
          boxShadow: `-20vw 20vh 1vh hsl(50,60%, 70%)`,
          filter: `drop-shadow(10vw 20vh 1vh rgb(160, 0, 210)) blur(20px)`,
          top: `${getRandom(-10, 100)}vh`,
          left: `${getRandom(-10, 100)}vw`,
        }}
      />
    );
  };

  const Square = () => {
    return (
      <div
        className="square"
        style={{
          background: `hsl(${getRandom(0, 300)}, 10%, 50%)`,
        }}
      />
    );
  };

  return (
    <>
      <div className="containerA">
        {new Array(10).fill(0).map((e, i) => (
          <Element key={i} />
        ))}
      </div>
      <div className="container2">
        {new Array(1000).fill(0).map((e, i) => (
          <Square key={i} />
        ))}
      </div>
    </>
  );
}

export default Grid;
