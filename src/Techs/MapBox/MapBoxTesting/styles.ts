import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

interface Props {
  displayMap: any;
}

export const MapContainer = styled.div<Props>`
  height: 100vh;
  ${(props) => (props.displayMap ? "opacity: .8" : "opacity : 0")}
`;

export const Loading = styled.div`
  position: absolute;
  background: black;
  color: white;
  font-size: 1.3rem;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
