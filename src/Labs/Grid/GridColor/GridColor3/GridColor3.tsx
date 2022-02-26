import style from "./GridColor3.module.scss";
import { useState, useEffect, useCallback } from "react";

export default function GridColor3() {
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
    return `rgb(${getRandom(30 + i / 1.1, 50 + i / 1)},${getRandom(
      0,
      250
    )},${getRandom(0 + i / 1.1, 40 + i)})`;
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

    const adjuster = (i: number) => {
      const x = i % 100;
      const y = Math.floor(i / 100);
      const colorArray = [
        "red",
        "black",
        "pink",
        "white",
        "yellow",
        "blue",
        "magenta",
        "green",
      ];
      const getRandomColorEl = () => {
        return colorArray[Math.floor(colorArray.length * Math.random())];
      };

      return `radial-gradient(${getRandomColorEl()}, ${getRandomColorEl()})`;
    };

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
                background: adjuster(i),
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
