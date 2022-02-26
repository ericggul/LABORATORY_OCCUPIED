import style from "./Nightsky.module.scss";
import { useState, useEffect } from "react";

function Nightsky() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
  };

  const getColor = () => {
    return `rgb(${getRandom(0, 255)},${getRandom(200, 250)},${getRandom(
      200,
      250
    )})`;
  };

  const boolRandom = () => {
    return Math.random() > 0.5;
  };

  const [size, setSize] = useState({ height: 0, width: 0 });
  const [show, setShow] = useState(false);

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    setShow(true);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  interface Props {
    x: any;
    y: any;
    horizontal: boolean;
  }
  const Light = ({ x, y, horizontal }: Props) => {
    return (
      <div
        className={style.light}
        style={{
          left: x,
          top: y,
          background: `white`,
          width: `${getRandom(1, 3)}px`,
          height: `${getRandom(1, 3)}px`,
          filter: `blur(${getRandom(0, 1)}px)`,
        }}
      />
    );
  };

  const numbers = Math.floor((size.width * size.height) / 1000);

  return (
    <div className={style.container}>
      {show &&
        new Array(numbers)
          .fill(0)
          .map((e, i) => (
            <Light
              x={getRandom(-100, size.width)}
              y={getRandom(-100, size.height)}
              horizontal={boolRandom()}
            />
          ))}
    </div>
  );
}

export default Nightsky;
