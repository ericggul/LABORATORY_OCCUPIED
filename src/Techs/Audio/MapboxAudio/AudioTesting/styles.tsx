import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Container = styled.div`
  height: calc(100vh + 10rem);
  width: calc(100vw + 10rem);
  position: absolute;
  top: -5rem;
  left: -5rem;
  background: #936f6f;
  opacity: 0.8;
  filter: blur(5rem);
`;

export const Button = styled.div`
  width: 100vw;
  position: absolute;
  top: 10vh;
  left: 0;
  text-align: center;
  color: black;
  font-size: 2rem;
  cursor: pointer;
`;
