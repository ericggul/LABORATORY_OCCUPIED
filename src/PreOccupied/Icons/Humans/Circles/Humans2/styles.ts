import styled from "styled-components";

export const StyledIcons = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(5, 20vh);
  align-items: center;
  justify-content: center;
`;

interface Icon {
  background: any;
  color: any;
}

export const Icon = styled.div<Icon>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  font-size: 7vw;
`;
