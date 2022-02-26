import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Whole = styled.div`
  background: #030505;

  display: grid;

  grid-template-columns: repeat(7, 10vw);
  grid-template-rows: repeat(5, 10vh);

  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-left: 15vw;
  padding-top: 15vh;
`;

export const Elevator = styled.div`
  width: 71%;
  height: 71%;
  background: white;
  position: relative;
`;
