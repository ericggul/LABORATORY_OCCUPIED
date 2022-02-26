import * as S from "./styles";
import { useEffect, useState, useCallback } from "react";
import e from "express";

interface Props {
  i: number;
}

export default function MeteoCircle() {
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

    const [radius, setRadius] = useState(getRandom(100, size.height / 2));
    const [angle, setAngle] = useState(getRandom(0, 360));

    // useEffect(()=>{
    //     let angleAnimated: any;
    //     angleAnimated = requestAnimationFrame(
    //     function angleAnimate(){
    //         setAngle(angle => angle +0.1)
    //         angleAnimated = requestAnimationFrame(angleAnimate);
    //     });
    //     return () => cancelAnimationFrame(angleAnimated);
    // }, [])

    return (
      <S.Meteo
        index={index}
        radius={radius}
        angle={angle}
        duration={getRandom(2, 5)}
        size={getRandom(radius * 0.005, radius * 0.008)}
        length={getRandom(radius * 0.2, radius * 0.5)}
        maxOpacity={getRandom(0.3, 0.8)}
      />
    );
  };

  return (
    <S.Container>
      <S.MeteoContainer>
        {new Array(100)
          .fill(0)
          .map((e, i) => loading && <Meteo index={i} key={i} />)}
      </S.MeteoContainer>
    </S.Container>
  );
}
