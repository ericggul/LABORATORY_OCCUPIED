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
  background: black;
  grid-template-rows: repeat(20, 5vh);
  grid-template-columns: repeat(20, 5vw);
`;
