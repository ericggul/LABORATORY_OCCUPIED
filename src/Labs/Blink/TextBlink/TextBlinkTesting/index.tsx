import React, { useEffect, useState } from "react";

import * as S from "./styles";

const TextContainer = () => {
  return (
    <S.Screen>
      <S.Text>영감의 두가지 조건</S.Text>
    </S.Screen>
  );
};

export default function TextBlinkTesting() {
  const [displayChangeStack, setDisplayChangeStack] = useState(0);
  const [display, setDisplay] = useState(false);

  const handleDisplayStatus = () => {
    if (Math.random() < 0.1) {
      setDisplayChangeStack((number) => number + 1);
    }
  };

  useEffect(() => {
    let interval = setInterval(handleDisplayStatus, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (displayChangeStack > 3 && display) {
      setDisplay((display) => !display);
      setDisplayChangeStack(0);
    }

    if (displayChangeStack > 10 && !display) {
      setDisplay((display) => !display);
      setDisplayChangeStack(0);
    }
  }, [displayChangeStack, display]);

  return <S.Container>{display && <TextContainer />}</S.Container>;
}
