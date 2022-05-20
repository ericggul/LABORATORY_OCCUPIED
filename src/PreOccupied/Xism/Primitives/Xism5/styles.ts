import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(transparent 0%, white 100%);

  background-size: 0.3rem 0.3rem;
  cursor: wait;
`;
