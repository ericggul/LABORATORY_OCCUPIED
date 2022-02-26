import style from "./Grid13.module.scss";
import { useState, useEffect } from "react";

export default function Grid13() {
  const [size, setSize] = useState({ height: 1000, width: 300 });
  const [loading, setLoading] = useState(false);
  const getSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };
  useEffect(() => {
    getSize();
    window.addEventListener("resize", getSize);
    setLoading(true);
    return () => window.removeEventListener("resieze", getSize);
  }, []);

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  interface squareProps {
    index: number;
  }

  const Square2 = ({ index }: squareProps) => {
    const x = index % 40;
    const y = Math.floor(index / 40);
    const rad =
      1 -
      Math.sqrt((x - 20) ** 2 + (y - (size.height / size.width) * 20) ** 2) / 8;

    return (
      <div
        className={style.square2}
        style={{
          background: `linear-gradient(hsla(30, 50%, 40%, ${rad}),
                     hsla(30, 50%, 40%, ${1 - rad}))`,
          boxShadow: `inset 0 0 1vw rgba(1,1,1,${rad})`,
        }}
      />
    );
  };

  return (
    <>
      <div className={style.container2}>
        {new Array(6400)
          .fill(0)
          .map((e, i) => loading && <Square2 index={i} key={i} />)}
      </div>
    </>
  );
}
