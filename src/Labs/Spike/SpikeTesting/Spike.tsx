import React, { useEffect, useState, useCallback, useRef } from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function useRandomInterval(callback: any, minDelay: number, maxDelay: number) {
  const timeoutId = useRef<any>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleTick = () => {
      const second = getRandom(minDelay, maxDelay);
      timeoutId.current = window.setTimeout(() => {
        savedCallback.current();
        handleTick();
      }, second);
    };

    handleTick();
    return () => clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = useCallback(function () {
    clearTimeout(timeoutId.current);
  }, []);
  return cancel;
}

function Spike() {
  const [color, setColor] = useState("#000000");

  const getRandomColor = () => {
    setColor(
      `rgb(${getRandom(200, 255)}, ${getRandom(200, 255)}, ${getRandom(
        0,
        100
      )})`
    );
  };
  useRandomInterval(getRandomColor, 10, 100);

  return <S.Container color={color}></S.Container>;
}

export default Spike;
