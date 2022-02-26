import style from "./Movement2.module.scss";
import { useState, useEffect } from "react";

function Movement2() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
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
    const c = getRandom(20, 80);
    const d = getRandom(30, 70);

    return (
      <div
        className={style.comp}
        style={{
          top: `${getRandom(5, 80)}vh`,
          left: `${getRandom(-10, 90)}vw`,
          borderRadius: `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${
            100 - d
          }% ${100 - c}%`,
          transform: `rotate(${getRandom(-90, 90)}deg)`,
        }}
      />
    );
  };

  const number = Math.floor((size.height * size.width) / 4000);

  return (
    <div className={style.container}>
      {new Array(number).fill(0).map((e, i) => load && <Component key={i} />)}
    </div>
  );
}

export default Movement2;
