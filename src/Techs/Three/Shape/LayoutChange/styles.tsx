import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const App = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
`;

export const VisContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 10.4rem;
  height: 5rem;
  background: #fafafa;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  min-height: 1rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;

interface ButtonProps {
  selected: any;
}

export const Button = styled.div<ButtonProps>`
  font-size: 0.8rem;
  font-weight: bold;
  width: 4rem;
  height: 1.3rem;

  margin-left: 0.4rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1px solid transparent;

  cursor: pointer;
  background: #eee;
  ${(props) => props.selected && "background: white; border: 1px solid black;"}
`;

export const PointText = styled.div`
  font-size: 0.8rem;
  strong {
    font-weight: bold;
  }
`;
