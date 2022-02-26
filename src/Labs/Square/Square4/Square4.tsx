import style from "./Square4.module.scss";
import { useState, useCallback } from "react";
import useTouchPosition from "../../../hooks/useTouchPosition";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

function Square4() {
  const Component = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: any) => {
      console.log(e);
      setClicked(true);
    };

    const getRandom = useCallback((a: number, b: number) => {
      return Math.random() * (b - a) + a;
    }, []);

    const getRandomColor = useCallback(() => {
      return `rgb(${getRandom(0, 100)},${getRandom(0, 100)},${getRandom(
        0,
        100
      )})`;
    }, []);

    return (
      <div
        className={clicked ? style.compclicked : style.comp}
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{ background: `${clicked && getRandomColor()}` }}
      ></div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(4000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Square4;
