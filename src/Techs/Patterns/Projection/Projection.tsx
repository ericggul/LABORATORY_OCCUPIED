import style from "./Projection.module.scss";
import { useState, useEffect } from "react";

function Projection() {
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
    const c = 0;
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
          transform: `rotate(${getRandom(-90, 90)}deg)`,
        }}
      />
    );
  };

  const Square2 = () => {
    return <div className={style.squareTwo} />;
  };

  const number = Math.floor((size.height * size.width) / 30000);

  return (
    <>
      <div className={style.container}>
        {new Array(number).fill(0).map((e, i) => load && <Component key={i} />)}
      </div>
      <div className={style.containerTwo}>
        {new Array(1600).fill(0).map((e, i) => (
          <Square2 key={i} />
        ))}
      </div>
    </>
  );
}

export default Projection;
