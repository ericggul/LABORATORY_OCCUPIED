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

export const MeteoContainer = styled.div`
  position: relative;
`;

interface Meteo {
  index: number;
  radius: number;
  angle: number;
  duration: number;
  size: number;
  length: number;
  maxOpacity: number;
}

export const Meteo = styled.div<Meteo>`
  position: absolute;
  background-color: #fff;
  top: ${(props) => props.radius * Math.sin((props.angle * Math.PI) / 180)}px;
  left: ${(props) => props.radius * Math.cos((props.angle * Math.PI) / 180)}px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  transform: rotate(${(props) => props.angle + 90}deg);
  animation-timing-function: linear;
  opacity: 0;
  animation-iteration-count: infinite;

  &:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 0;
    height: 0;
    border-top: ${(props) => (props.size * 3) / 5}px solid transparent;
    border-bottom: ${(props) => (props.size * 3) / 5}px solid transparent;
    border-left: ${(props) => props.length}px solid white;
    position: absolute;
    left: ${(props) => props.size / 2}px;
    top: 0px;
  }

  @keyframes meteo_${(props) => props.index} {
    0% {
      opacity: 0;
    }
    30% {
      opacity: ${(props) => props.maxOpacity};
    }
    60% {
      opacity: ${(props) => props.maxOpacity};
    }
    100% {
      opacity: 0;
    }
  }

  animation: meteo_ ${(props) => props.index} ${(props) => props.duration}s
    infinite linear;
  animation-delay: ${(props) => props.duration - 0.5}s;
`;
