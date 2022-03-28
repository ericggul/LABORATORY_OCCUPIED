import styled from "styled-components";

export const StyledIcons = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(40, 2rem);
  grid-template-rows: repeat(40, 2rem);
`;

interface Icon {
  size: number;
}

export const Icon = styled.div<Icon>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => size}rem;
`;
