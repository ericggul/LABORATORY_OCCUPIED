import styled, { css } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export const Whole = styled.div`
  background: transparent;
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 50vw;
  height: 100vh;
  margin-left: 25vw;
`;

export const Elevator = styled.div`
  width: 100%;
  position: relative;
`;

interface Movement {
  time: any;
  delay: any;
}

export const Movement = styled.div<Movement>`
  background: white;
  height: 0.3vh;
  width: 200%;
  margin-left: 50%;
  position: absolute;
  left: 0;

  @keyframes elevate {
    from {
      top: 20vh;
    }
    to {
      top: 80vh;
    }
  }

  animation: elevate ${(props) => props.time}s linear infinite alternate;
  animation-delay: ${(props) => props.delay}s;
`;
