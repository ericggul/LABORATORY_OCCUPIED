import style from "./CircleRotate.module.scss";
import { useState, useEffect, useCallback } from "react";

function CircleRotate() {
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
    return `rgba(${getRandom(0, 210)},${getRandom(0, 210)},${getRandom(
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
    width: number;
  }

  const Container = () => {
    const [elements, setElements] = useState({ x: 0, y: 0 });
    const onMouseClick = (e: any) => {
      setElements({ x: e.clientX, y: e.clientY });
    };
    useEffect(() => {
      window.addEventListener("mousemove", onMouseClick);
      return () => window.removeEventListener("mousemove", onMouseClick);
    }, []);

    const [color, setColor] = useState(getColor());
    const [width, setWidth] = useState(getRandom(100, 200));
    const [height, setHeight] = useState(getRandom(100, 200));
    const [top, setTop] = useState(
      getRandom(size.height / 2 - 25, size.height / 2 + 25)
    );
    const [left, setLeft] = useState(
      getRandom(size.width / 2 - 25, size.width / 2 + 25)
    );
    const [degree, setDegree] = useState(getRandom(0, 360));

    useEffect(() => {
      setDegree(
        (Math.atan(
          (elements.x - size.width / 2) / (elements.y - size.height / 2)
        ) /
          Math.PI) *
          180 +
          getRandom(-1, 1)
      );
    }, [elements, size]);

    return (
      <div
        className={style.ellipse}
        style={{
          background: color,
          width: `${width}px`,
          height: `${height}px`,
          top: `${top}px`,
          left: `${left}px`,
          transform: `translate(-50%, -50%) rotate(${degree}deg)`,
        }}
      ></div>
    );
  };

  return (
    <div className={style.whole}>
      {new Array(100).fill(0).map((e, i) => loading && <Container key={i} />)}
    </div>
  );
}

export default CircleRotate;
