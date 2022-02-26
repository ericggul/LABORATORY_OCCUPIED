import style from "./GridRose.module.scss";
import { useState, useEffect, useCallback } from "react";

export default function GridRose() {
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

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const [rootColor, setRootColor] = useState([
    getRandom(200, 300),
    getRandom(50, 70),
    getRandom(50, 70),
  ]);

  const getColor = useCallback(() => {
    return `hsl(
        ${getRandom(rootColor[0] - 10, rootColor[0] + 10)},
        ${getRandom(rootColor[1] - 30, rootColor[1] + 30)}%,
        ${getRandom(rootColor[2] - 10, rootColor[2] + 10)}%)`;
  }, []);

  interface Props {
    i: number;
  }

  const Component = ({ i }: Props) => {
    const [color, setColor] = useState([
      getColor(),
      getColor(),
      getColor(),
      getColor(),
      getColor(),
    ]);
    const [width, setWidth] = useState((200 - i) ** 0.7);
    const a = getRandom(5, 95);
    const b = getRandom(10, 90);
    const c = getRandom(10, 90);
    const d = getRandom(10, 90);
    const borderRadius = `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${
      100 - d
    }% ${100 - c}%`;

    return (
      <div
        className={style.box}
        style={{
          background: `radial-gradient(${color[0]},${color[1]},${color[2]} ,${color[3]})`,
          width: `${width}vw`,
          height: `${width}vw`,
          top: `calc(50vh - ${width / 2}vw)`,
          left: `${50 - width / 2}vw`,
          borderRadius: borderRadius,
        }}
      />
    );
  };

  const Container = () => {
    const [heightSize, setHeightSize] = useState(
      Math.ceil((size.height / size.width) * 20)
    );
    const [array, setArray] = useState(new Array(heightSize * 20).fill(0));

    useEffect(() => {
      setArray(new Array(200).fill(0));
    }, [heightSize]);

    return (
      <div
        className={style.Boxcontainer}
        style={{
          display: "grid",
          position: "absolute",
          transformOrigin: `center`,
        }}
      >
        {array.map((e, i) => (
          <Component i={i} key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className={style.whole}>
      <Container />
    </div>
  );
}
