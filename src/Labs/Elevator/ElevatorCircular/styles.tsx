import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Whole = styled.div`
  background: #030505;

  position: relative;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

interface Props {
  top: any;
  left: any;
  angle: any;
}

export const Elevator = styled.div<Props>`
  position: absolute;
  width: 60px;
  height: 30px;
  // background: white;
  border: 1px solid white;

  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: translate(-50%, -50%) rotate(${(props) => props.angle}deg);
`;
