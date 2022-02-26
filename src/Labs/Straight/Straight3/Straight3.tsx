import style from "./Straight.module.scss";
import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

function Straight3() {
  const [size, setSize] = useState({ height: 0, width: 0 });

  console.log(size);

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const getColor = () => {
    return `hsl(${getRandom(0, 50)}, ${getRandom(30, 50)}%, ${getRandom(
      20,
      80
    )}%)`;
  };

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  interface Props {
    height: number;
    color: number;
  }

  const Line = ({ height, color }: Props) => {
    return (
      <div
        className={style.line}
        style={{
          height: `${height}px`,
          marginTop: `${height * 50}px`,
          background: getColor(),
          transform: `rotate(${getRandom(-30, 30)}deg)`,
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
    const height = size.height;
    var len = Math.floor(height);
    var height_array = [];
    var margin_array: number[] = [];
    var left_width = height * 1.5;

    for (var i = 0; i < len; i++) {
      if (left_width >= 0) {
        var this_height = Math.random() * 25 + 0.02;
        var this_margin = 0;
        height_array.push(this_height / 25);
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
      {new Array(300).fill(0).map((e, i) => (
        <Component
          x={getRandom(-size.width * 0.9, size.width * 0.9)}
          y={getRandom(-size.height * 0.9, size.height * 0.9)}
          angle={getRandom(-1, 1)}
          key={i}
        />
      ))}
    </div>
  );
}

export default Straight3;
