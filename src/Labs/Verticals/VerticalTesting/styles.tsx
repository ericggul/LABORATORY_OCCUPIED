import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Whole = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: black;
`;
export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: transparent;

  display: flex;
  align-items: flex-end;
  flex-direction: row;
`;

export const Element = styled.div`
  bottom: 0;
  height: 70vh;
  margin-top: 15vh;
  animation: hueing 20s linear infinite;
  background: white;

  @keyframes hueing {
    from {
      filter: hue-rotate(0);
    }
    to {
      filter: hue-rotate(360deg);
    }
  }
`;
