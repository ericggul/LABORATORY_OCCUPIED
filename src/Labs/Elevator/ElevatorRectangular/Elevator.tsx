import * as S from "./styles";
import { useState, useCallback } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

interface Props {
  time: any;
  delay: any;
}

function Elevator({ time, delay }: Props) {
  return <S.Elevator></S.Elevator>;
}

export default function CircleTesting() {
  return (
    <S.Whole>
      {new Array(35).fill(0).map((e, i) => (
        <Elevator time={getRandom(10, 15)} delay={getRandom(-30, 0)} />
      ))}
    </S.Whole>
  );
}
