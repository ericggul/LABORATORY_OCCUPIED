import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;

  display: flex;
  align-items: flex-end;
  flex-direction: row;
  background: radial-gradient(red, black);
`;

export const Element = styled.div`
  bottom: 0;
  background: black;
  padding-left: 1vw;

  @keyframes move {
    to {
      transform: scaleY(1.1);
    }
  }
  animation: move 10s infinite alternate;
`;
