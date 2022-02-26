import style from "./Square8.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Square8() {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const Component = ({ i }: Props) => {
    const [clicked, setClicked] = useState(false);
    const handleClick = (e: any) => {
      console.log(e);
      setClicked(!clicked);
    };

    const getHexRandom = useCallback(() => {
      const result = new Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      console.log(result);
      return result;
    }, []);
    const generateHex = useCallback((i: number) => {
      const initial = parseInt("0305b5", 16);
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
          background: `radial-gradient(${getRandom(3, 70)}px ${getRandom(
            3,
            70
          )}px,${getColor()}, black)`,
          transform: `rotate(${getRandom(-40, 50)}deg)`,
        }}
      ></div>
    );
  };

  const Block = () => {
    const rows = Math.floor(getRandom(1, 7));
    const columns = Math.floor(getRandom(1, 8));
    return (
      <div
        className={style.block}
        style={{
          gridTemplateColumns: `repeat(${columns}, 80px)`,
          gridTemplateRows: `repeat(${rows}, 80px)`,
          top: `${getRandom(-50, 200)}vh`,
          left: `${getRandom(-50, 100)}vw`,
          transform: `rotate(${getRandom(-10, 10)}deg)`,
        }}
      >
        {new Array(rows * columns).fill(0).map((e, i) => (
          <Component i={i} key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(80).fill(0).map((e, i) => (
        <Block key={i} />
      ))}
    </div>
  );
}

export default Square8;
