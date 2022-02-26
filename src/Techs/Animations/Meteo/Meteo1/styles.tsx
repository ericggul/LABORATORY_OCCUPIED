import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: black;
`;

interface Meteo {
  index: number;
  right: number;
  top: number;
  move: any;
  duration: number;
  size: number;
  length: number;
  maxOpacity: number;
}

export const Meteo = styled.div<Meteo>`
  position: absolute;
  background-color: #fff;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  transform: rotate(-35deg);
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  &:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 0;
    height: 0;
    border-top: ${(props) => props.size / 2}px solid transparent;
    border-bottom: ${(props) => props.size / 2}px solid transparent;
    border-left: ${(props) => props.length}px solid white;
    position: absolute;
    left: ${(props) => props.size}px;
    top: 0;
  }

  @keyframes meteo_${(props) => props.index} {
    0% {
      opacity: 0;
      right: ${(props) => props.right}px;
      top: ${(props) => props.top}px;
    }
    30% {
      opacity: ${(props) => props.maxOpacity};
    }
    60% {
      opacity: ${(props) => props.maxOpacity};
    }
    100% {
      opacity: 0;
      right: ${(props) => props.right + props.move * 1.4}px;
      top: ${(props) => props.top + props.move}px;
    }
  }

  animation: meteo_ ${(props) => props.index} ${(props) => props.duration}s
    infinite linear;
`;
