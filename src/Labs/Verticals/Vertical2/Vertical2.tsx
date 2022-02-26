import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

function Vertical2() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const generateHex = useCallback((i: number) => {
    const initial = parseInt("400000", 16);
    return (initial + i * 4).toString(16);
  }, []);

  const generateRGB = useCallback((i: number) => {
    return `rgb(${getRandom(20, 240)}, ${getRandom(30, 200)}, ${getRandom(
      0,
      210
    )})`;
  }, []);

  interface Props {
    i: number;
  }
  const Element = ({ i }: Props) => {
    return (
      <S.Element
        style={{
          width: `${getRandom(0.03, 0.1)}vw`,
          background: `${generateRGB(i)}`,
        }}
      />
    );
  };

  return (
    <S.Container>
      {new Array(3500).fill(0).map((e, i) => (
        <Element key={i} i={i} />
      ))}
    </S.Container>
  );
}

export default Vertical2;
