import styled, { css } from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(220, 170, 200), rgb(240, 150, 180));
`;

interface Loc {
  x: number;
  y: number;
}

export const Button = styled.div<Loc>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: 8rem;
  height: 2.5rem;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 2rem #fff;
  border-radius: 2rem;
`;
