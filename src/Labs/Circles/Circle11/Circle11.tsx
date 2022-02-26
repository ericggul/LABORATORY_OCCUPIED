import style from "./Circle11.module.scss";
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

const getPlusMinus = () => {
  return Math.random() < 0.5 ? -1 : 1;
};

function CircleGrid({ globalWidth }: GridProps) {
  const Component = ({ i, globalWidth }: Props) => {
    const rootColor = [
      getRandom(200, 300),
      getRandom(40, 60),
      getRandom(40, 60),
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
                                      rootColor[0] - 50,
                                      rootColor[0] + 50
                                    )},
                                    ${getRandom(
                                      rootColor[1] - 30,
                                      rootColor[1] + 30
                                    )}%,
                                    ${getRandom(
                                      rootColor[2] - 30,
                                      rootColor[2] + 30
                                    )}%)`;
          };

          const height = getRandom(globalWidth * 0, globalWidth * 0.3);

          const r = globalWidth / 3;
          const theta = getRandom(0, 360);

          const x_rt = globalWidth / 2 - r * Math.cos(theta) - height / 2;
          const y_rt = globalWidth / 2 - r * Math.sin(theta) - height / 2;

          return (
            <div
              className={style.square}
              style={{
                height: `${height}vw`,
                width: `${height}vw`,
                top: `${y_rt}vw`,
                left: `${x_rt}vw`,
                background: getColor(),
                opacity: `0.6`,
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

function Circle11() {
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

export default Circle11;
