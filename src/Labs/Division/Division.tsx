import style from "./Division.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Division() {
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
          background: `rgba(1,1,1,1)`,
          transform: `rotate(${getRandom(-90, 90)}deg)`,
          boxShadow: `0 0 ${getRandom(2, 10)}px black`,
        }}
      ></div>
    );
  };

  const Block = () => {
    const rows = 5;
    const columns = 5;
    return (
      <div
        className={style.block}
        style={{
          gridTemplateColumns: `repeat(${columns}, 20px)`,
          gridTemplateRows: `repeat(${rows}, 20px)`,
          top: `${getRandom(-50, 200)}vh`,
          left: `${getRandom(-50, 50)}vw`,
          transform: `rotate(${getRandom(-40, 0)}deg)`,
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
      {new Array(200).fill(0).map((e, i) => (
        <Block key={i} />
      ))}
    </div>
  );
}

export default Division;
