import style from "./Color2.module.scss";
import { useState, useCallback } from "react";

function Color2() {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const Component = () => {
    const [clicked, setClicked] = useState(false);
    const handleClick = (e: any) => {
      console.log(e);
      setClicked(!clicked);
    };

    const getHexRandom = useCallback(() => {
      const result = new Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      console.log(result);
      return result;
    }, []);

    const getColor = useCallback(() => {
      return `rgb(${getRandom(100, 250)},${getRandom(100, 200)},${getRandom(
        100,
        200
      )})`;
    }, []);

    const getColorOp = useCallback(() => {
      return `rgba(${getRandom(100, 250)},${getRandom(100, 200)},${getRandom(
        100,
        200
      )}, 0.4)`;
    }, []);

    return (
      <div
        className={style.comp}
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{
          background: `${getColorOp()}`,
          transform: `rotate(${getRandom(-90, 90)}deg)`,
          boxShadow: `0 0 ${getRandom(30, 100)}px ${getColor()}`,
          top: `${getRandom(-10, 110)}vh`,
          left: `${getRandom(-10, 110)}vw`,
          width: `${getRandom(4, 10)}vw`,
          height: `${getRandom(4, 10)}vh`,
        }}
      ></div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(300).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Color2;
