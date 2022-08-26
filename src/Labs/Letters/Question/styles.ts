import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Text = styled.h1`
  margin: 2rem;
  font-size: 30vw;
  color: #eee;
  font-weight: bold;
`;

export const SmallText = styled.h1`
  margin: 2rem;
  text-align: center;
  font-size: 8vw;
  color: #fff;
  font-weight: bold;
`;

interface LetterInterface {
  left: number;
  top: number;
  size: number;
  rotation: number;
  randomBack?: boolean;
}

export const Letter = styled.div<LetterInterface>`
  mix-blend-mode: difference;
  position: absolute;
  color: white;
  left: ${({ left }) => left}px;
  font-weight: bold;
  top: ${({ top }) => top}px;
  font-size: ${({ size }) => size}px;
  width: 10vh;
  height: 10vh;
  transform: rotate(${({ rotation }) => rotation}deg);

  background: ${({ randomBack }) => randomBack && "red"};

  font-family: Times New Roman;
`;
