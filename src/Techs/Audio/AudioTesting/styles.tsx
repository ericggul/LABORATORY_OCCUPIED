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

export const Button = styled.div`
  width: 100vw;
  position: absolute;
  top: 10vh;
  left: 0;
  text-align: center;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;
