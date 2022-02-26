import style from "./Writings.module.scss";
import { useState, useCallback, useEffect, useMemo } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import confetti from "canvas-confetti";

interface Props {
  i: number;
}

const XI_LOC = [];

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const numberGenerator = () =>
  Math.random() < 0.3
    ? getRandom(0.01, 10).toFixed(3)
    : Math.random() < 0.7
    ? getRandom(10, 100).toFixed(2)
    : getRandom(100, 1000).toFixed(2);

let colors = ["#C845454", "#38ED87", "#3855ED", "#ED38E6"];

function XiCompass() {
  return (
    <div className={style.container}>
      {new Array(1000).fill(0).map((e, i) => (
        <Row key={i} />
      ))}
    </div>
  );
}

function Row() {
  const marginLeft = useMemo(
    () => getRandom(getRandom(-5, 0), getRandom(0, 5)),
    []
  );
  const width = useMemo(() => getRandom(3, 4), []);
  const zeroChance = useMemo(() => getRandom(0, getRandom(0, 1)), []);

  const repeat = useMemo(
    () => 4 + Math.floor(getRandom(0, getRandom(0, getRandom(0, 200)))),
    []
  );

  return (
    <div className={style.number} style={{ marginLeft: `${marginLeft}rem` }}>
      <div className={style.single}>
        {Math.random() < zeroChance ? numberGenerator() : 0}
      </div>

      {new Array(repeat).fill(0).map((e, i) => (
        <>
          <div className={style.divider}>{":"}</div>
          <div
            className={style.single}
            style={{ width: `${width * getRandom(0.08, 0.15)}rem` }}
          >
            {Math.random() > zeroChance ? numberGenerator() : 0}
          </div>
        </>
      ))}
    </div>
  );
}
export default XiCompass;
