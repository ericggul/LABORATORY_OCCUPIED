import styled from "styled-components";
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

interface PosWrapper {
  left: number;
  top: number;
  fontSize: number;
  color: any;
}

export const IconWrapper = styled.div<PosWrapper>`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  height: auto;
  transform: translate(-50%, -50%);
`;
