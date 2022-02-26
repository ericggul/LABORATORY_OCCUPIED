import style from "./Diamond2.module.scss";
import { useState, useEffect } from "react";

function Diamond2() {
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
    const [init, setInit] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setInit(true);
      }, getRandom(2, 5));
    }, []);

    return <div className={init ? style.compinit : style.init}></div>;
  };

  return (
    <div className={style.container}>
      {new Array(4000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Diamond2;
