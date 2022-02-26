import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

function QuadriSquare12() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const generateHex = useCallback((i: number) => {
    const initial = parseInt("400000", 16);
    return (initial + i * 4).toString(16);
  }, []);

  const generateRGB = useCallback((i: number) => {
    return `rgb(${getRandom(210, 250)}, ${getRandom(200, 250)}, ${getRandom(
      100,
      250
    )})`;
  }, []);

  interface Props {
    i: number;
  }

  const Component = ({ i }: Props) => {
    const getHexRandom = useCallback(() => {
      const result = new Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      console.log(result);
      return result;
    }, []);
    const generateHex = useCallback((i: number) => {
      const initial = parseInt("0305b5", 16);
      return (initial + Math.floor(i / 100)).toString(16);
    }, []);
    const getColor = useCallback(() => {
      return `#${getHexRandom()}`;
    }, []);
    return (
      <S.Comp
        style={{
          background: `black`,
          transform: `rotate(${getRandom(-7, 10)}deg)`,
          boxShadow: `0 0 ${getRandom(2, 15)}px black`,
        }}
      />
    );
  };

  const Block = () => {
    const rows = Math.floor(getRandom(1, 5));
    const columns = Math.floor(getRandom(1, 5));
    return (
      <S.Block
        style={{
          gridTemplateColumns: `repeat(${columns}, 80px)`,
          gridTemplateRows: `repeat(${rows}, 80px)`,
          top: `${getRandom(0, 50)}vh`,
          position: "absolute",
          left: `${getRandom(0, 50)}vw`,
          transform: `rotate(${getRandom(-80, 0)}deg)`,
        }}
      >
        {new Array(rows * columns).fill(0).map((e, i) => (
          <Component i={i} key={i} />
        ))}
      </S.Block>
    );
  };

  const Element = ({ i }: Props) => {
    return (
      <S.Element
        style={{
          background: `${generateRGB(i)}`,
        }}
      >
        {new Array(10).fill(0).map((e, i) => (
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

export default QuadriSquare12;
