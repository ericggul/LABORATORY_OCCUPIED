import React, { useState, useMemo, useEffect } from "react";
import { FiThumbsUp } from "react-icons/fi";

import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function SingleIcon({ state }: any) {
  const COLOR_ARRAY = ["white", "hotpink"];

  return (
    <S.Icon
      color={COLOR_ARRAY[state ? 1 : 0]}
      background={COLOR_ARRAY[state ? 0 : 1]}
    >
      <FiThumbsUp />
    </S.Icon>
  );
}

function Icons() {
  const INITIAL_INTERVAL = 900;

  const [colorState, setColorState] = useState(0);
  const [intervalTIme, setIntervalTime] = useState(INITIAL_INTERVAL);

  function test() {
    setColorState((st: any) => 1 - st);
  }

  useEffect(() => {
    const timeout1 = window.setTimeout(() => {
      setIntervalTime(INITIAL_INTERVAL / 2);
    }, INITIAL_INTERVAL * 7.99);

    const timeout2 = window.setTimeout(() => {
      setIntervalTime(INITIAL_INTERVAL / 4);
    }, INITIAL_INTERVAL * (7.99 + 3.99));

    const timeout3 = window.setTimeout(() => {
      setIntervalTime(INITIAL_INTERVAL / 8);
    }, INITIAL_INTERVAL * (7.99 + 3.99 + 1.99));

    return () => {
      window.clearTimeout(timeout1);
      window.clearTimeout(timeout2);
      window.clearTimeout(timeout3);
    };
  }, []);
  useEffect(() => {
    const interval = window.setInterval(() => {
      test();
    }, intervalTIme);
    return () => window.clearInterval(interval);
  }, [intervalTIme]);

  return (
    <S.StyledIcons>
      {new Array(25).fill(0).map((e, i) => (
        <SingleIcon key={i} state={(i + colorState) % 2} />
      ))}
    </S.StyledIcons>
  );
}
export default Icons;
