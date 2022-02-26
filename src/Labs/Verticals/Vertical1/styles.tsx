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
  background: rgb(30, 140, 100);
`;

interface EProps {
  delay: number;
  duration: number;
}

export const Element = styled.div<EProps>`
  bottom: 0;
  height: 100vh;
  @keyframes reveal {
    from {
      height: 2vh;
    }
    to {
      height: 100vh;
    }
  }

  animation: reveal 1s linear backwards;
  animation-delay: ${(props) => props.delay}s;
  animation-duration: ${(props) => props.duration}s;
`;
