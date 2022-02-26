import style from "./GridColor4.module.scss";
import { useState, useEffect, useCallback } from "react";

export default function GridColor4() {
  const [size, setSize] = useState({ height: 1, width: 1 });
  const [elements, setElements] = useState({ x: 0, y: 1 });
  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const onMouseClick = (e: any) => {
    setElements({
      x: (e.clientX / size.width) * 100,
      y: (e.clientY / size.height) * 100,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseClick);
    return () => window.removeEventListener("mousemove", onMouseClick);
  }, [size]);

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
      const getRandomColorEl = (i: number) => {
        return `rgb(${getRandom(125 - i, 125 + i)}, ${getRandom(100, 120)}, ${
          10 + i
        })`;
      };

      return `linear-gradient(${getRandomColorEl(
        Math.abs(x + y - elements.x - elements.y)
      )}, ${getRandomColorEl(Math.abs(x - elements.x))})`;
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
