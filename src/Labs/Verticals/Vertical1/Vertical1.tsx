import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

function Vertical1() {
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };
  const [load, setLoad] = useState(false);

  // const fib_fun = (i: number) => {
  //     if(i==0 || i==1){
  //         return 1
  //     } else{
  //         return fib_fun(i-1) + fib_fun(i-2)
  //     }
  // }

  useEffect(() => {
    setLoad(true);
  }, []);

  const generateRGB = useCallback(() => {
    return `rgb(${getRandom(20, 40)}, ${getRandom(30, 250)}, ${getRandom(
      100,
      110
    )})`;
  }, []);

  const generateGB = useCallback(() => {
    return `rgb(${getRandom(20, 40)}, ${getRandom(30, 250)}, ${getRandom(
      100,
      110
    )})`;
  }, []);
  const generateRG = useCallback(() => {
    return `rgb(${getRandom(100, 150)}, ${getRandom(30, 70)}, ${getRandom(
      120,
      180
    )})`;
  }, []);

  const generateGradient = useCallback(() => {
    return `linear-gradient(${generateGB()}, ${generateGB()})`;
  }, []);

  interface Props {
    i: number;
  }
  const Element = ({ i }: Props) => {
    return (
      <S.Element
        style={{
          width: `${getRandom(3, 10)}vw`,
          background: `${generateGradient()}`,
        }}
        delay={getRandom(-0.3, 0.3)}
        duration={getRandom(0.3, 2)}
      />
    );
  };

  return (
    <S.Container>
      {new Array(35).fill(0).map((e, i) => load && <Element key={i} i={i} />)}
    </S.Container>
  );
}

export default Vertical1;
