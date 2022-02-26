import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

export default function Vertical4() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const generateRGB = useCallback((i: number) => {
    return `rgb(${getRandom(100, 200)}, ${getRandom(30, 90)}, ${getRandom(
      90,
      140
    )})`;
  }, []);

  interface Props {
    i: number;
  }
  const Element = ({ i }: Props) => {
    return (
      <S.Element
        style={{
          height: `${getRandom(50, 80)}vh`,
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
    <S.Whole>
      {new Array(10).fill(0).map((e, i) => (
        <Container key={i} />
      ))}
    </S.Whole>
  );
}
