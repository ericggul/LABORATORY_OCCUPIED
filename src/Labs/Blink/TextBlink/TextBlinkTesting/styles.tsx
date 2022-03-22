import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(20, 5vw);
  grid-template-rows: repeat(20, 5vh);
`;

interface Props {
  display: boolean;
}

export const Screen = styled.div<Props>`
  width: 5vw;
  height: 5vh;
  background: ${(props) => (props.display ? "black" : "white")};
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  transition: all 2s;
`;

export const Text = styled.div`
  font-size: 0.7rem;
`;
