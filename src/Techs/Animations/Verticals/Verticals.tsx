import * as S from "./styles";
import { useState, useEffect } from "react";

function Verticals() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const Element = () => {
    return (
      <S.Element
        style={{
          height: `${getRandom(10, 90)}vh`,
          width: `${getRandom(3, 10)}vw`,
        }}
      />
    );
  };

  return (
    <S.Container>
      {new Array(35).fill(0).map((e, i) => (
        <Element key={i} />
      ))}
    </S.Container>
  );
}

export default Verticals;
