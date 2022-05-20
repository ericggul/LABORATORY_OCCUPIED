import style from "./Rainbow.module.scss";
import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

function Rainbow() {
  const [size, setSize] = useState({ height: 0, width: 0 });

  interface Props {
    color: number;
  }

  console.log(size);

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const getHexRandom = useCallback((colors: any) => {
    const result = new Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 8 + 8).toString(16))
      .join("");
    return result;
  }, []);

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  const Line = ({ color }: Props) => {
    return (
      <div
        className={style.line}
        style={{
          height: `${getRandom(3, 10)}px`,
          width: `${getRandom(10, 200)}px`,
          background: `#${getHexRandom(color)}`,
          opacity: "0.1",
        }}
      />
    );
  };

  interface CompProps {
    x: number;
    y: number;
    angle: number;
  }

  const Component = ({ x, y, angle }: CompProps) => {
    console.log(x, y, angle);

    const height = size.height;
    var len = Math.floor(height / 5);

    return (
      <div
        className={style.box}
        style={{ transform: `translate(${x}px,${y}px) rotate(${angle}deg)` }}
      >
        {new Array(len).fill(0).map((val, i) => (
          <Line color={15} key={i + 100} />
        ))}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(Math.floor(size.width / 2)).fill(0).map((e, i) => (
        <Component
          x={getRandom(-size.width / 2, size.width)}
          y={getRandom(0, size.height * 0.7)}
          angle={getRandom(0, 30)}
          key={i}
        />
      ))}
    </div>
  );
}

export default Rainbow;
