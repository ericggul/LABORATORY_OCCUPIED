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

export const DirectionsPanel = styled.div`
  position: fixed;
  width: 30%;
  height: 50%;
`;

export const Loading = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
`;
