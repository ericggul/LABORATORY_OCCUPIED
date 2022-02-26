import style from "./CircleTesting.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
  rowInterval: number;
  colInterval: number;
}

interface blockProps {
  row: number;
  column: number;
}

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

function Block({ row, column }: blockProps) {
  const Component = ({ i, rowInterval, colInterval }: Props) => {
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
    const [height, setHeight] = useState(getRandom(0.5, 5));
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
            height: `${height}px`,
            width: `${height}px`,
            top: `${colInterval - height / 2}px`,
            left: `${colInterval - height / 2}px`,
            background: `white`,
          }}
        />
      </div>
    );
  };

  const [rowInterval, setRowInterval] = useState(getRandom(3, 15));
  const [colInterval, setColInterval] = useState(getRandom(3, 15));
  const [blockSize, setBlockSize] = useState(10);

  return (
    <div
      className={style.container}
      style={{
        gridTemplateColumns: `repeat(${column}, ${rowInterval}px)`,
        gridTemplateRows: `repeat(${row}, ${colInterval}px)`,
        left: `0`,
        top: `0`,
      }}
    >
      {new Array(row * column).fill(0).map((e, i) => (
        <Component
          i={i}
          key={i}
          rowInterval={rowInterval}
          colInterval={colInterval}
        />
      ))}
    </div>
  );
}

export default function CircleTesting() {
  return (
    <div className={style.whole}>
      {new Array(100).fill(0).map((e, i) => (
        <Block
          row={Math.ceil(getRandom(10, 50))}
          column={Math.ceil(getRandom(10, 50))}
        />
      ))}
    </div>
  );
}
