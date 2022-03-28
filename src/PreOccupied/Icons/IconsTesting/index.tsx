import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import useMousePosition from "../../../hooks/useMousePosition";
import useTouchPosition from "../../../hooks/useTouchPosition";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function SingleIcon() {
  const [size, setSize] = useState(getRandom(1, 2));
  return (
    <S.Icon size={size}>
      <FiThumbsUp />
    </S.Icon>
  );
}

function Icons() {
  const { mouseX, mouseY } = useMousePosition();
  const { touchX, touchY } = useTouchPosition();

  return (
    <S.StyledIcons>
      <S.Container>
        {new Array(1600).fill(0).map((e, i) => (
          <SingleIcon key={i} />
        ))}
      </S.Container>
    </S.StyledIcons>
  );
}
export default Icons;
