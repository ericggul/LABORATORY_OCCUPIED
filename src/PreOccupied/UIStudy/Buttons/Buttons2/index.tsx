import * as S from "./styles";
import useResize from "../../../../hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
export default function Buttons() {
  const [windowWidth, windowHeight] = useResize();

  return (
    <>
      <S.Container></S.Container>
      {new Array(300).fill(0).map((e, i) => (
        <S.Button
          key={i}
          x={getRandom(0, windowWidth)}
          y={getRandom(0, windowHeight)}
        >
          Learn More
        </S.Button>
      ))}
    </>
  );
}
