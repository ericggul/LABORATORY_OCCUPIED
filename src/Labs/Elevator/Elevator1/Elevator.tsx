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
  return (
    <S.Elevator>
      <S.Movement
        time={time}
        delay={delay}
        style={{
          background: `rgb(0, 0, ${getRandom(100, 200)})`,
        }}
      />
    </S.Elevator>
  );
}

export default function CircleTesting() {
  return (
    <>
      {new Array(10).fill(0).map((e, i) => (
        <S.Whole>
          {new Array(Math.floor(getRandom(50, 150))).fill(0).map((e, i) => (
            <Elevator time={getRandom(5, 40)} delay={getRandom(-80, 0)} />
          ))}
        </S.Whole>
      ))}
    </>
  );
}
