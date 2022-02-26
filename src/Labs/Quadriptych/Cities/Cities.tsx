import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

function Cities() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const generateRGB = useCallback(() => {
    return `rgb(${getRandom(0, 250)}, ${getRandom(10, 20)}, ${getRandom(
      200,
      250
    )})`;
  }, []);

  interface Props {
    i: number;
    color: any;
  }

  interface elProps {
    i: number;
  }

  const Component = ({ i, color }: Props) => {
    return (
      <S.Comp
        style={{
          background: color,
          transform: `rotate(${getRandom(-7, 10)}deg)`,
          boxShadow: `0 0 8px black`,
        }}
      />
    );
  };

  const Block = () => {
    const thisColor = Math.random() < 0.5 ? "white" : "black";
    const rows = Math.floor(getRandom(3, 18));
    const columns = Math.floor(getRandom(3, 18));
    const range = getRandom(0, 180);
    const center = getRandom(0, 30);
    return (
      <S.Block
        style={{
          gridTemplateColumns: `repeat(${columns}, 3vw)`,
          gridTemplateRows: `repeat(${rows}, 3vw)`,
          top: `${getRandom(center - 1, center + 1)}vh`,
          position: "absolute",
          left: `${getRandom(center - 1, center + 1)}vw`,
          transform: `rotate(${getRandom(-range, range)}deg)`,
        }}
      >
        {new Array(rows * columns).fill(0).map((e, i) => (
          <Component i={i} color={thisColor} key={i} />
        ))}
      </S.Block>
    );
  };

  const Element = ({ i }: elProps) => {
    return (
      <S.Element
        style={{
          background: `${Math.random() < 0.5 ? "white" : "black"}`,
        }}
      >
        {new Array(20).fill(0).map((e, i) => (
          <Block key={i} />
        ))}
      </S.Element>
    );
  };

  return (
    <S.Container>
      {new Array(4).fill(0).map((e, i) => (
        <Element key={i} i={i} />
      ))}
    </S.Container>
  );
}

export default Cities;
