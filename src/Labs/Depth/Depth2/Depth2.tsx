import style from "./Depth2.module.scss";
import { useState, useEffect, useCallback } from "react";

function Depth2() {
  const [elements, setElements] = useState({ x: 100, y: 300 });
  const [size, setSize] = useState({ height: 1000, width: 300 });
  const [bluecolor, setBluecolor] = useState(0);

  const bluecolor_array = [0, 180, 70, 240];

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const onMouseClick = (e: any) => {
    setElements({ x: e.clientX, y: e.clientY });
  };

  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseClick);
    return () => window.removeEventListener("mousemove", onMouseClick);
  }, []);

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  interface Props {
    i: number;
  }

  const adjust_index = 0.9;

  const Inner = ({ i }: Props) => {
    return (
      <div
        className={style.square}
        style={{
          background: `rgb(${250 - i ** 2 * 0.3 + 10},${
            bluecolor_array[bluecolor]
          },${i ** 0.5 * 10 + 10})`,
          top: `${elements.y}px`,
          left: `${elements.x}px`,
          height: `${getRandom(0.7, 0.99) ** i * 100}vh`,
          width: `${getRandom(0.8, 0.99) ** i * 100}vw`,
          transform: `translate(-${(elements.x / size.width) * 100}%, -${
            (elements.y / size.height) * 100
          }%)`,
        }}
      />
    );
  };

  return (
    <div className={style.container}>
      {new Array(50).fill(0).map((e, i) => (
        <Inner i={i} key={i} />
      ))}
    </div>
  );
}

export default Depth2;
