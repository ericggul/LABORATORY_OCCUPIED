import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
`;

export const Text = styled.div`
  position: absolute;
  bottom: 10vh;
  right: 10vw;
  text-align: right;
`;

export const Controls = styled.div`
  position: fixed;
  color: white;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: row;
`;

interface Button {
  current: any;
}

export const Button = styled.div<Button>`
  width: 3rem;
  height: 1rem;
  cursor: pointer;
  padding: 0.3rem;
  ${(props) => !props.current && "color: #aaa;"}
`;
