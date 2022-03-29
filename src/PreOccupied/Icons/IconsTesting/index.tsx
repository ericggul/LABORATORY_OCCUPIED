import React, { useState, useMemo, useEffect } from "react";
import { FiThumbsUp } from "react-icons/fi";

import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function SingleIcon({ state }: any) {
  const COLOR_ARRAY = ["white", "hotpink"];
  const [internalState, setInternalState] = useState(state);

  return (
    <S.Icon
      color={COLOR_ARRAY[internalState ? 1 : 0]}
      background={COLOR_ARRAY[internalState ? 0 : 1]}
      onClick={() => setInternalState((st: any) => 1 - st)}
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

  return (
    <S.StyledIcons>
      {new Array(25).fill(0).map((e, i) => (
        <SingleIcon key={i} state={(i + colorState) % 2} />
      ))}
    </S.StyledIcons>
  );
}
export default Icons;
