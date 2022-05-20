import * as S from "./styles";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
export default function Taang() {
  const { width, height } = useWindowDimensions();
  return (
    <S.Container>
      <S.Text>Taang</S.Text>
      <S.SmallText>About a boy who had read as seen</S.SmallText>
      {new Array(330).fill(0).map((e, i) => (
        <S.Letter
          left={getRandom(0, width)}
          top={getRandom(0, height)}
          rotation={getRandom(0, 360)}
          size={getRandom(width * 0.2, width * 0.7)}
          //   randomBack={Math.random() < 0.01}
          key={i}
        >
          !
        </S.Letter>
      ))}
    </S.Container>
  );
}
