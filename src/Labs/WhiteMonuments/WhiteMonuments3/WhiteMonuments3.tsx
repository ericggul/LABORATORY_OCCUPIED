import style from "./WhiteMonuments3.module.scss";
import { useState, useEffect, useCallback } from "react";

export default function WhiteMonuments3() {
  const [size, setSize] = useState({ height: 0, width: 1 });
  const [loading, setLoading] = useState(false);
  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    setLoading(true);
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    return `rgba(${getRandom(200, 210)},${getRandom(0, 210)},${getRandom(
      0,
      210
    )}, ${getRandom(0.05, 0.2)})`;
  }, []);

  const getColorWithRange = useCallback((range: any) => {
    console.log(range[0]);
    return `rgba(${getRandom(range[0].min, range[0].max)},${getRandom(
      range[1].min,
      range[1].max
    )},${getRandom(range[2].min, range[2].max)}, ${getRandom(0.05, 1)})`;
  }, []);

  const getRangeRandom = useCallback((min: number, max: number) => {
    const a = Math.floor(getRandom(min, max));
    const b = Math.floor(getRandom(a, max));
    return { min: a, max: b };
  }, []);

  interface Props {
    i: number;
  }

  const a = getRandom(10, 90);
  const b = getRandom(10, 90);
  const c = getRandom(10, 90);
  const d = getRandom(10, 90);

  const borderRadius = `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${
    100 - d
  }% ${100 - c}%`;

  const Container = ({ i }: Props) => {
    const [color, setColor] = useState(getColor());
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [top, setTop] = useState(
      size.height / 2 + 80 * Math.sin((i / 90) * Math.PI)
    );
    const [left, setLeft] = useState(
      size.width / 2 + 80 * Math.cos((i / 90) * Math.PI)
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
          border: `1px solid ${color}`,
          borderRadius: borderRadius,
        }}
      ></div>
    );
  };

  return (
    <div className={style.whole}>
      {new Array(180)
        .fill(0)
        .map((e, i) => loading && <Container i={i} key={i} />)}
    </div>
  );
}
