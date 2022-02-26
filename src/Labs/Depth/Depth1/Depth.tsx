import style from "./Depth.module.scss";
import { useState, useEffect } from "react";

function Depth() {
  const [elements, setElements] = useState({ x: 100, y: 300 });
  const [size, setSize] = useState({ height: 1000, width: 300 });

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

  console.log(
    (elements.x / size.width) * 100,
    (elements.y / size.height) * 100
  );

  const adjust_index = 0.9;

  const Inner = ({ i }: Props) => {
    return (
      <div
        className={style.square}
        style={{
          background: `rgb(${i * 3 + 10},${0},${i * 10 + 10})`,
          top: `${elements.y}px`,
          left: `${elements.x}px`,
          height: `${adjust_index ** i * 100}vh`,
          width: `${adjust_index ** i * 100}vw`,
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

export default Depth;
