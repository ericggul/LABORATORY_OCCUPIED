import React, { useState, useEffect } from "react";

import useResize from "../../../hooks/useResize";
import useMousePosition from "../../../hooks/useMousePosition";
import useTouchPosition from "../../../hooks/useTouchPosition";

import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function YourScore() {
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [width, height] = useResize();
  const { mouseX, mouseY } = useMousePosition();
  const { touchX, touchY } = useTouchPosition();

  const TARGET_POS = { x: getRandom(0.25, 0.7), y: getRandom(0.25, 0.7) };
  const AREA = { x: 0.05, y: 0.05 };

  const MODULO = 500;

  useEffect(() => {
    if (
      mouseX / width > TARGET_POS.x - AREA.x &&
      mouseX / width < TARGET_POS.x + AREA.x &&
      mouseY / height > TARGET_POS.y - AREA.y &&
      mouseY / height < TARGET_POS.y + AREA.y &&
      !finished
    ) {
      setScore((sc) => (sc + 1) % MODULO);
    } else if (
      touchX / width > TARGET_POS.x - AREA.x &&
      touchX / width < TARGET_POS.x + AREA.x &&
      touchY / height > TARGET_POS.y - AREA.y &&
      touchY / height < TARGET_POS.y + AREA.y &&
      !finished
    ) {
      setScore((sc) => (sc + 1) % MODULO);
    }
  }, [mouseX, mouseY, touchX, touchY, width, height, finished]);

  //Seconds
  const [seconds, setSeconds] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((scd) => Math.max(scd - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setFinished(true);
      setTimeout(() => {
        alert("finished!");
      }, 100);
    }
  }, [seconds]);

  return (
    <S.Container>
      <S.Seconds>{seconds} seconds left</S.Seconds>
      <S.ScoreContainer>
        <p> Your Score is </p>
        <h1>{score}</h1>
      </S.ScoreContainer>
    </S.Container>
  );
}
