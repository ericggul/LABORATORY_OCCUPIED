import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: hsl(16, 70%, 6%);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ElevatorSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem;
`;

interface On {
  state: number;
}

export const ElevatorEl = styled.div<On>`
  width: 0.5rem;
  height: 8rem;
  margin: 0.4rem 0;
  background: hsl(50, 70%, 10%);
  ${({ state }) => state === 1 && "background: hsl(50, 80%, 90%)"};
  ${({ state }) =>
    state === 2 && `  animation: flickering 0.4s infinite linear alternate`};

  @keyframes flickering {
    0% {
      background: hsl(50, 80%, 90%);
      box-shadow: 0 0 0.5rem hsl(50, 80%, 90%);
    }
    42% {
      background: hsl(50, 80%, 90%);
      box-shadow: 0 0 0.5rem hsl(50, 80%, 90%);
    }
    58% {
      background: hsl(50, 70%, 10%);
      box-shadow: none;
    }
    100% {
      background: hsl(50, 70%, 10%);
      box-shadow: none;
    }
  }
`;
