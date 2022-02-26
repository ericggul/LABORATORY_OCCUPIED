import "./Grid5.scss";
import { useState, useEffect } from "react";

function Grid5() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const Square = () => {
    const [color, setColor] = useState(`hsl(${getRandom(0, 300)}, 50%, 70%)`);

    useEffect(() => {
      const interval = setInterval(() => {
        setColor(`hsl(${getRandom(0, 300)}, 50%, 70%)`);
      }, getRandom(7000, 30000));
      return () => clearInterval(interval);
    }, []);

    return (
      <div
        className="squareOne"
        style={{
          background: color,
          opacity: `${getRandom(0, 0.4)}`,
        }}
      />
    );
  };

  const Square2 = () => {
    return (
      <div
        className="squareTwo"
        style={{
          background: `hsl(${getRandom(0, 300)}, 70%, 80%)`,
          opacity: `${getRandom(0, 1)}`,
        }}
      />
    );
  };

  const Square3 = () => {
    return (
      <div
        className="squareThree"
        style={{
          background: `hsl(${getRandom(200, 300)}, 70%, 70%)`,
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
      <div className="containerThree">
        {new Array(1600).fill(0).map((e, i) => (
          <Square3 key={i} />
        ))}
      </div>
    </>
  );
}

export default Grid5;
