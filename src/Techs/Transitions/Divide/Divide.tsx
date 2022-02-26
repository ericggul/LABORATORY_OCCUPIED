import style from "./Divide.module.scss";
import { useState, useEffect } from "react";

function Divide() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
  };

  const [size, setSize] = useState({ height: 1000, width: 300 });

  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const Component = () => {
    return (
      <div
        className={style.comp}
        style={{ transform: `rotate(${getRandom(-30, 30)}deg)` }}
      ></div>
    );
  };

  return (
    <>
      <div className={style.container}>
        {new Array(4000).fill(0).map((e, i) => (
          <Component key={i} />
        ))}
      </div>
    </>
  );
}

export default Divide;
