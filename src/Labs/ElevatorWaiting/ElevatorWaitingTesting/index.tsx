import React, { useState, useEffect, useMemo } from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomInt = (a: number, b: number) => Math.floor(getRandom(a, b));

const ElevatorEl = () => {
  //0: nothing
  //1: waiting
  //2: arrived
  const [evState, setEvState] = useState(0);
  const time = useMemo(
    () => ({
      wait: getRandom(0.5, 3) * 1000,
      arrive: getRandom(0.5, 3) * 1000,
      depart: getRandom(0.5, 3) * 1000,
    }),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setEvState(0);
      setTimeout(() => {
        setEvState(1);
      }, time.wait);
      setTimeout(() => {
        setEvState(2);
      }, time.wait + time.arrive);
    }, time.wait + time.arrive + time.depart);
    return () => clearInterval(interval);
  }, [time]);
  return <S.ElevatorEl state={evState} />;
};

const ElevatorSet = () => {
  return (
    <S.ElevatorSet>
      <ElevatorEl />
      <ElevatorEl />
    </S.ElevatorSet>
  );
};

export default function Elevator() {
  return (
    <S.Container>
      {new Array(30).fill(0).map((_, i) => (
        <ElevatorSet key={i} />
      ))}
    </S.Container>
  );
}
