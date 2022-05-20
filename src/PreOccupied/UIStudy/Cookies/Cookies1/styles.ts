import styled, { css } from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(200, 170, 240), rgb(240, 150, 220));
`;

interface Loc {
  left: number;
  top: number;
}

export const CookieContainer = styled.div<Loc>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  width: calc(100% - 4rem);

  padding: 1rem 2rem;
  opacity: 1;
`;

export const Description = styled.div``;

export const Button = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.6rem;
  width: 9rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
