import * as S from "./styles";
import { useEffect, useState, useCallback } from "react";
import e from "express";

interface Props {
  i: number;
}

export default function Meteo1() {
  const [size, setSize] = useState({ height: 0, width: 1 });
  const [loading, setLoading] = useState(false);
  const getSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSize();
    setLoading(true);
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resieze", getSize);
  }, []);

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  interface Props {
    index: number;
  }

  const Meteo = ({ index }: Props) => {
    const ratio = size.width / size.height;

    const startRight = getRandom(0, size.width);
    const startTop = getRandom(0, size.height);
    console.log(startRight);
    return (
      <S.Meteo
        index={index}
        right={startRight}
        top={startTop}
        move={getRandom(400, size.height)}
        duration={getRandom(0.5, 2)}
        size={getRandom(2, 5)}
        length={getRandom(50, 200)}
        maxOpacity={getRandom(0.3, 0.8)}
      />
    );
  };

  return (
    <S.Container>
      {new Array(40)
        .fill(0)
        .map((e, i) => loading && <Meteo index={i} key={i} />)}
    </S.Container>
  );
}
