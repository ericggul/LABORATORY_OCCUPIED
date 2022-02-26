import "./Emergence.scss";
import { useState, useEffect } from "react";

function Emergence() {
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
            filter: drop-shadow(10vw 20vh 1vh rgb(160, 0, 210)) blur(10px);
            top: ${getRandom(-10, 100)}vh;
            left: ${getRandom(-10, 100)}vw;
        `
    );
    document.body.appendChild(n);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createNode();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const Element = () => {
    return (
      <div
        className="element"
        style={{
          background: `hsl(0,100%, 50%)`,
          boxShadow: `-20vw 20vh 1vh hsl(50,40%, 70%)`,
          filter: `drop-shadow(10vw 20vh 1vh rgb(160, 0, 210)) blur(10px)`,
          top: `${getRandom(-10, 100)}vh`,
          left: `${getRandom(-10, 100)}vw`,
        }}
      />
    );
  };

  return (
    <div className="container">
      {new Array(40).fill(0).map((e, i) => (
        <Element key={i} />
      ))}
    </div>
  );
}

export default Emergence;
