import style from "./WhiteMonumentsTest.module.scss";
import { useState, useEffect, useCallback } from "react";

export default function WhiteMonuments3() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ height: 1, width: 1 });
  const [elements, setElements] = useState({ x: 0, y: 1 });
  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    setLoading(true);
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const onMouseClick = (e: any) => {
    setElements({ x: e.clientX || 0, y: e.clientY || 0 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseClick);
    return () => window.removeEventListener("mousemove", onMouseClick);
  }, [size]);

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    return `rgba(${getRandom(200, 210)},${getRandom(0, 210)},${getRandom(
      0,
      210
    )}, ${getRandom(0.05, 0.2)})`;
  }, []);

  interface Props {
    i: number;
  }

  const [a, setA] = useState(getRandom(5, 95));
  const [b, setB] = useState(getRandom(5, 95));
  const [c, setC] = useState(getRandom(5, 95));
  const [d, setD] = useState(getRandom(5, 95));

  const borderRadius = `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${
    100 - d
  }% ${100 - c}%`;

  const [topInterval, setTopInterl] = useState([
    getRandom(80, 100),
    getRandom(40, 60),
  ]);

  const Container = ({ i }: Props) => {
    const [color, setColor] = useState(getColor());
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [top, setTop] = useState(
      size.height / 2 +
        (((elements.x / 4) * size.height) / size.width) *
          Math.cos(((i * 4) / elements.x) * Math.PI) +
        (((elements.x / 4) * size.height) / size.width) *
          Math.sin((i / topInterval[1]) * Math.PI)
    );
    const [left, setLeft] = useState(
      size.width / 2 +
        (((elements.y / 4) * size.width) / size.height) *
          Math.cos((i / 130) * Math.PI) +
        (((elements.y / 4) * size.width) / size.height) *
          Math.sin(((i * 4) / elements.y) * Math.PI)
    );

    return (
      <div
        className={style.ellipse}
        style={{
          background: "transparent",
          width: `${width}px`,
          height: `${height}px`,
          top: `${top}px`,
          left: `${left}px`,
          transform: `translate(-50%, -50%)`,
          border: `1px solid white`,
          borderRadius: borderRadius,
        }}
      ></div>
    );
  };

  return (
    <div className={style.whole}>
      {new Array(600)
        .fill(0)
        .map((e, i) => loading && <Container i={i} key={i} />)}
    </div>
  );
}
