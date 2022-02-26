import style from "./TestingCentre.module.scss";
import { useState, useEffect } from "react";

function TestingCentre() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };
  const [load, setLoad] = useState(false);
  const [size, setSize] = useState({ height: 1000, width: 300 });

  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    setLoad(true);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const Component = () => {
    const a = getRandom(20, 80);
    const b = getRandom(30, 70);
    const c = getRandom(30, 70);
    const d = 0;

    return (
      <div
        className={style.comp}
        style={{
          top: `${getRandom(5, 80)}vh`,
          left: `${getRandom(-10, 90)}vw`,
          borderRadius: `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${
            100 - d
          }% ${100 - c}%`,
          transform: `rotate(${getRandom(-90, 270)}deg)`,
          background: `hsl(${getRandom(250, 300)}, 40%, 50%)`,
          opacity: getRandom(0.05, 0.35),
        }}
      />
    );
  };

  const Circle2 = () => {
    const size = getRandom(8, 13);
    return (
      <div className={style.boxTwo}>
        <div
          className={style.circleTwo}
          style={{
            width: `${size}vw`,
            height: `${size}vw`,
            marginTop: `${(10 - size) / 2}vw`,
            marginLeft: `${(10 - size) / 2}vw`,
          }}
        />
      </div>
    );
  };

  const number = Math.floor((size.height * size.width) / 10000);

  return (
    <>
      <div className={style.containerTwo}>
        {new Array(1600).fill(0).map((e, i) => load && <Circle2 key={i} />)}
      </div>
    </>
  );
}

export default TestingCentre;
