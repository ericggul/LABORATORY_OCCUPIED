import style from "./CircleGrid2.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

interface blockProps {
  row: number;
  column: number;
}

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

function Block({ row, column }: blockProps) {
  const Component = ({ i }: Props) => {
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
    const [height, setHeight] = useState(getRandom(0.5, 10));
    const [color, setColor] = useState(`white`);

    const handleClick = () => {
      setHeight(205);
    };
    return (
      <div className={style.comp}>
        <div
          className={style.square}
          onClick={handleClick}
          style={{
            height: `${i % 10}px`,
            width: `${i % 10}px`,
            top: `${15 - (i % 10) / 2}px`,
            left: `${15 - (i % 10) / 2}px`,
            background: `white`,
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={style.container}
      style={{
        gridTemplateColumns: `repeat(${column}, ${getRandom(20, 40)}px)`,
        gridTemplateRows: `repeat(${row}, ${getRandom(20, 40)}px)`,
        bottom: `20vh`,
        top: `${getRandom(-50, 100)}vh`,
      }}
    >
      {new Array(row * column).fill(0).map((e, i) => (
        <Component i={i} key={i} />
      ))}
    </div>
  );
}

export default function CircleTesting() {
  return (
    <div className={style.whole}>
      {new Array(200).fill(0).map((e, i) => (
        <Block
          row={Math.ceil(getRandom(5, 20))}
          column={Math.ceil(getRandom(5, 25))}
        />
      ))}
    </div>
  );
}
