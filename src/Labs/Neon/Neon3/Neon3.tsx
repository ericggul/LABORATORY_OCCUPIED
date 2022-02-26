import style from "./Neon3.module.scss";
import { useState, useEffect } from "react";

function Neon3() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
  };

  const getColor = () => {
    return `rgb(${getRandom(0, 255)},${getRandom(0, 250)},${getRandom(
      0,
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
    const single = (t: number) => {
      return `0 0 ${t}px #FF0006`;
    };
    const text = (n: number) => {
      var final = ``;
      for (var i = 0; i < n; i++) {
        final += `0 0 ${(i + 10) ** 1.7}px ${getColor()}`;
        if (i < n - 1) {
          final += ",";
        }
      }
      return final;
    };

    return (
      <div
        className={style.light}
        style={{
          boxShadow: `${text(30)}`,
          left: x,
          top: y,
          background: `rgba(1,1,1,0)`,
          transform: `${!horizontal && `rotate(90deg)`}`,
        }}
      />
    );
  };

  const numbers = Math.floor((size.width * size.height) / 400);

  return (
    <div className={style.container}>
      {show &&
        new Array(numbers)
          .fill(0)
          .map((e, i) => (
            <Light
              x={getRandom(-300, size.width)}
              y={getRandom(-300, size.height)}
              horizontal={boolRandom()}
            />
          ))}
    </div>
  );
}

export default Neon3;
