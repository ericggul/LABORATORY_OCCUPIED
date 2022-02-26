import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

function Vertical3() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const generateHex = useCallback((i: number) => {
    const initial = parseInt("400000", 16);
    return (initial + i * 4).toString(16);
  }, []);

  const generateRGB = useCallback((i: number) => {
    return `rgb(${20 + 9 * i}, ${getRandom(30, 90)}, ${getRandom(90, 140)})`;
  }, []);

  interface Props {
    i: number;
  }
  const Element = ({ i }: Props) => {
    return (
      <S.Element
        style={{
          width: `${getRandom(4, 8)}vw`,
          background: `${generateRGB(i)}`,
          opacity: `${getRandom(0.1, 0.3)}`,
        }}
      />
    );
  };

  const Container = () => {
    return (
      <S.Container>
        {new Array(25).fill(0).map((e, i) => (
          <Element key={i} i={i} />
        ))}
      </S.Container>
    );
  };

  return (
    <>
      {new Array(25).fill(0).map((e, i) => (
        <Container key={i} />
      ))}
    </>
  );
}

export default Vertical3;
