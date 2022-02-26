import style from "./Vapor.module.scss";
import { useState, useEffect } from "react";

function Vapor() {
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
        style={{
          top: `${getRandom(30, 80)}vh`,
          left: `${getRandom(0, 100)}vw`,
          background: `#aaa`,
        }}
      />
    );
  };

  return (
    <div className={style.container}>
      {new Array(100).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Vapor;
