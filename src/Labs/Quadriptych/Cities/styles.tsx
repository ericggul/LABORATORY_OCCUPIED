import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;

  display: grid;
  grid-template-rows: 50vh 50vh;
  grid-template-columns: 50vw 50vw;
`;

export const Element = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Block = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export const Comp = styled.div`
  width: 1vw;
  height: 1vw;
  border-radius: 50%;
`;
