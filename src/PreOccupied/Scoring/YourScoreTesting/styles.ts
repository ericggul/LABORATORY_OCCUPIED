import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;

  font-family: Courier New;
`;

export const ScoreContainer = styled.div`
  width: 50vw;
  height: 50vh;
  background: white;
  color: black;

  background: rgb(247, 246, 236);
  box-shadow: inset 0 0 2vw #777, 0 0 1vw white;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  font-size: 1.5rem;
  font-weight: bold;

  h1 {
    font-size: 3rem;
  }
`;

export const Seconds = styled.div`
  position: absolute;
  bottom: calc(75vh + 1rem);
  right: 25vw;
  font-size: 1rem;
  color: white;
`;
