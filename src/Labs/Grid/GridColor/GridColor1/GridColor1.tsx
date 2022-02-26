import style from "./GridColor1.module.scss";
import { useState, useEffect, useCallback } from "react";

export default function GridColor1() {
  const [size, setSize] = useState({ height: 0, width: 1 });
  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback((i: number) => {
    return `rgba(${getRandom(200 - i, 210 - i / 1.1)},${getRandom(
      0,
      50
    )},${getRandom(0 + i / 1.1, 40 + i)}, 1)`;
  }, []);

  const getColorWithRange = useCallback((range: any) => {
    console.log(range[0]);
    return `rgba(${getRandom(range[0].min, range[0].max)},${getRandom(
      range[1].min,
      range[1].max
    )},${getRandom(range[2].min, range[2].max)}, 1})`;
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
    const colorRange = [
      getRangeRandom(210, 220),
      getRangeRandom(0, 200),
      getRangeRandom(0, 200),
    ];
    const heightSize = Math.ceil((size.height / size.width) * 100);
    const adjuster = 200 / heightSize;

    return (
      <div
        className={style.Boxcontainer}
        style={{
          display: "grid",
          position: "absolute",
          transformOrigin: `center`,
          gridTemplateRows: `repeat(${heightSize}, 1vw)`,
        }}
      >
        {new Array(heightSize * 100).fill(0).map((e, i) => {
          return (
            <div
              className={style.box}
              style={{
                background: getColor((i / 100) * adjuster),
              }}
              key={i}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={style.whole}>
      <Container />
    </div>
  );
}
