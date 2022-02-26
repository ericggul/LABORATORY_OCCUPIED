import * as S from "./styles";
import { useCallback, useState, useEffect, useMemo } from "react";

export default function VerticalTesting() {
  const [size, setSize] = useState({ height: 1, width: 1 });
  const [elements, setElements] = useState({ x: 0, y: 1 });
  const getSizeClick = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  const onMouseClick = (e: any) => {
    setElements({
      x: (e.clientX / size.width) * 100,
      y: (e.clientY / size.height) * 100,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseClick);
    return () => window.removeEventListener("mousemove", onMouseClick);
  }, [size]);

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const generateRGB = useCallback((i: number) => {
    return `rgb(${getRandom(100, 200)}, ${getRandom(30, 90)}, ${getRandom(
      90,
      140
    )})`;
  }, []);

  interface Props {
    i: number;
  }
  const Element = ({ i }: Props) => {
    const background = useMemo(() => {
      generateRGB(i);
    }, []);
    const opacity = useMemo(() => {
      getRandom(0.1, 0.3);
    }, []);

    return (
      <S.Element
        style={{
          height: `${getRandom(20, 70) + i ** 0.6}vh`,
          width: `${6}vw`,
          background: `${background}`,
          opacity: `${getRandom(0.1, 0.3)}`,
        }}
      />
    );
  };

  const Container = () => {
    return (
      <S.Container>
        {new Array(250).fill(0).map((e, i) => (
          <Element key={i} i={i} />
        ))}
      </S.Container>
    );
  };

  return (
    <S.Whole>
      {new Array(5).fill(0).map((e, i) => (
        <Container key={i} />
      ))}
    </S.Whole>
  );
}
