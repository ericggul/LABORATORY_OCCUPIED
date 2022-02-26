import style from "./Circle10.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
  globalWidth: number;
}

interface GridProps {
  globalWidth: number;
}

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

function CircleGrid({ globalWidth }: GridProps) {
  const Component = ({ i, globalWidth }: Props) => {
    const rootColor = [
      getRandom(200, 300),
      getRandom(30, 70),
      getRandom(30, 70),
    ];

    return (
      <div
        className={style.comp}
        style={{
          width: `${globalWidth}vw`,
          height: `${globalWidth}vw`,
        }}
      >
        {new Array(200).fill(0).map((e, i) => {
          getRandom(rootColor[0] - 10, rootColor[0] + 10);

          const getColor = () => {
            return `hsl(
                                    ${getRandom(
                                      rootColor[0] - 30,
                                      rootColor[0] + 30
                                    )},
                                    ${getRandom(
                                      rootColor[1] - 10,
                                      rootColor[1] + 10
                                    )}%,
                                    ${getRandom(
                                      rootColor[2] - 10,
                                      rootColor[2] + 10
                                    )}%)`;
          };
          const height = getRandom(globalWidth * 0, globalWidth * 0.4);

          return (
            <div
              className={style.square}
              style={{
                height: `${height}vw`,
                width: `${height}vw`,
                top: `${getRandom(0, globalWidth - height)}vw`,
                left: `${getRandom(0, globalWidth - height)}vw`,
                background: getColor(),
                opacity: `0.4`,
              }}
              key={i}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={style.container}
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(
          100 / globalWidth
        )},${globalWidth}vw)`,
        gridTemplateRows: `repeat(${Math.ceil(
          500 / globalWidth
        )},${globalWidth}vw)`,
      }}
    >
      {new Array(Math.ceil(100 / globalWidth) * Math.ceil(500 / globalWidth))
        .fill(0)
        .map((e, i) => (
          <Component i={i} globalWidth={globalWidth} key={i} />
        ))}
    </div>
  );
}

function Circle10() {
  return (
    <div className={style.whole}>
      {
        <>
          <CircleGrid globalWidth={20} />
        </>
      }
    </div>
  );
}

export default Circle10;
