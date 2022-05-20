import * as S from "./styles";
import useResize from "../../../../hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const SingleCookie = ({ windowWidth, windowHeight }: any) => {
  return (
    <S.CookieContainer
      left={getRandom(0, windowWidth) - windowWidth / 2}
      top={getRandom(0, windowHeight) - 70}
    >
      <S.Description>
        <h1>Your privacy is our priority.</h1>
        <p>
          We use cookies to offer you the customised information which fits with
          your needs, and to analyse our traffic to offer our customers a better
          service. Read our cookie policy to learn more.
        </p>
      </S.Description>
      <S.Button>Accept Cookies</S.Button>
    </S.CookieContainer>
  );
};

export default function Buttons() {
  const [windowWidth, windowHeight] = useResize();

  return (
    <S.Container>
      {new Array(50).fill(0).map((e, i) => (
        <SingleCookie
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          key={i}
        />
      ))}
    </S.Container>
  );
}
