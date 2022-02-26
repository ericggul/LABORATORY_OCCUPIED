import style from "./Pompidou.module.scss";
import { useState, useEffect, useCallback } from "react";

function Pompidou() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getColor = useCallback(() => {
    return `rgba(${getRandom(200, 210)},${getRandom(0, 50)},${getRandom(
      0,
      40
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

  const Container = ({ width }: Props) => {
    const colorRange = [
      getRangeRandom(210, 220),
      getRangeRandom(0, 200),
      getRangeRandom(0, 200),
    ];

    return (
      <div className={Math.random() < 0.5 ? style.wrapper : style.outerwrapper}>
        <div className={style.container} />
        <div className={style.container} />
      </div>
    );
  };

  return (
    <div className={style.whole}>
      {new Array(1500).fill(0).map((e, i) => (
        <Container width={getRandom(5, 10)} key={i} />
      ))}
    </div>
  );
}

export default Pompidou;
