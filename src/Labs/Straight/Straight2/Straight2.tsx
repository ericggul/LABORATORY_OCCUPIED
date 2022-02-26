import style from "./Straight2.module.scss";
import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

function Straight2() {
  const [size, setSize] = useState({ height: 0, width: 0 });

  interface Props {
    height: number;
    color: number;
  }

  console.log(size);

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const getHexRandom = useCallback((colors) => {
    const result = new Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * colors).toString(16))
      .join("");
    return result;
  }, []);

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  const Line = ({ height, color }: Props) => {
    return (
      <div
        className={style.line}
        style={{
          height: `${height}px`,
          marginTop: `${height * 50}px`,
          background: `#${getHexRandom(color)}`,
          transform: `rotate(${getRandom(-70, 10)}deg)`,
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
    var len = Math.floor(height);
    var height_array = [];
    var margin_array: number[] = [];
    var left_width = height * 1.5;

    for (var i = 0; i < len; i++) {
      if (left_width >= 0) {
        var this_height = Math.random() * 100 + 0.2;
        var this_margin = 0;
        height_array.push(this_height / 100);
        margin_array.push(this_margin);
        left_width -= this_height;
        left_width -= this_margin;
      } else {
        break;
      }
    }

    return (
      <div
        className={style.box}
        style={{ transform: `translate(${x}px,${y}px) rotate(${angle}deg)` }}
      >
        {height_array.map((val, i) => (
          <Line height={val} color={getRandom(15, 16)} key={i + 100} />
        ))}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(150).fill(0).map((e, i) => (
        <Component
          x={getRandom(-size.width / 2, size.width)}
          y={getRandom(-size.height / 2, size.height)}
          angle={getRandom(-180, 180)}
          key={i}
        />
      ))}
    </div>
  );
}

export default Straight2;
