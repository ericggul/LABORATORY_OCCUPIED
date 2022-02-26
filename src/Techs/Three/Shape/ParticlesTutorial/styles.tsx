import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
`;

export const Text = styled.div`
  position: absolute;
  bottom: 10vh;
  right: 10vw;
  text-align: right;
`;
