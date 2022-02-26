import style from "./Square5.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Square5() {
  const Component = ({ i }: Props) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: any) => {
      console.log(e);
      setClicked(true);
    };

    const getRandom = useCallback((a: number, b: number) => {
      return Math.random() * (b - a) + a;
    }, []);

    const getHexRandom = useCallback(() => {
      const result = new Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      console.log(result);
      return result;
    }, []);

    const generateHex = useCallback((i: number) => {
      const initial = parseInt("2d34ab", 16);
      return (initial + Math.floor(i / 100)).toString(16);
    }, []);

    const getColor = useCallback(() => {
      return `#${getHexRandom()}`;
    }, []);

    return (
      <div
        className={clicked ? style.compclicked : style.comp}
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{
          background: `radial-gradient(${getColor()}, #${generateHex(i)})`,
        }}
      ></div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(4000).fill(0).map((e, i) => (
        <Component i={i} key={i} />
      ))}
    </div>
  );
}

export default Square5;
