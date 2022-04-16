import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Button = styled.div`
  width: 10rem;
  height: 3rem;
  background: #aaa;
`;

export const HelperBarContainer = styled.div`
  width: 10rem;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const HelperBar = styled.div`
  position: relative;
  width: 10rem;
  height: 3rem;
  background: #aaa;
`;

interface Value {
  value: number;
  extreme: number;
}

export const HelperTicker = styled.div<Value>`
  position: absolute;
  left: ${({ value, extreme }) => (5 * (extreme + value)) / extreme}rem;
  width: 4px;
  height: 3rem;
  background: black;
`;

export const HelperValue = styled.div`
  font-size: 1.3rem;
  color: black;
`;
