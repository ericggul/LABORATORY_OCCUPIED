import style from "./Color1.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Color1() {
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

    const getColor = useCallback(() => {
      return `rgb(${getRandom(100, 250)},${getRandom(100, 200)},${getRandom(
        100,
        200
      )})`;
    }, []);

    return (
      <div
        className={clicked ? style.compclicked : style.comp}
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{
          background: `${getColor()}`,
          opacity: 0.1,
          transform: `rotate(${getRandom(-90, 90)}deg)`,
          boxShadow: `0 0 ${getRandom(30, 100)}px ${getColor()}`,
        }}
      ></div>
    );
  };

  const Block = () => {
    const rows = 10;
    const columns = 10;
    return (
      <div
        className={style.block}
        style={{
          gridTemplateColumns: `repeat(${columns}, 50px)`,
          gridTemplateRows: `repeat(${rows}, 50px)`,
          top: `${getRandom(-20, 130)}vh`,
          left: `${getRandom(-20, 120)}vw`,
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
      {new Array(100).fill(0).map((e, i) => (
        <Block key={i} />
      ))}
    </div>
  );
}

export default Color1;
