import style from "./CircleColor.module.scss";
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
      getRandom(50, 70),
      getRandom(50, 70),
    ];

    return (
      <div
        className={style.comp}
        style={{
          width: `${globalWidth}vw`,
          height: `${globalWidth}vw`,
        }}
      >
        {new Array(5000).fill(0).map((e, i) => {
          getRandom(rootColor[0] - 10, rootColor[0] + 10);
          const getColor = () => {
            return `hsl(
                            ${getRandom(rootColor[0] - 30, rootColor[0] + 30)},
                            ${getRandom(rootColor[1] - 20, rootColor[1] + 20)}%,
                            ${getRandom(
                              rootColor[2] - 20,
                              rootColor[2] + 20
                            )}%)`;
          };
          const height = getRandom(globalWidth * 0, globalWidth * 0.1);
          const r = getRandom(globalWidth * 0.2, globalWidth * 0.4);
          const theta = getRandom(-5, 5);
          const x_rt =
            globalWidth / 2 -
            r * Math.cos(theta) -
            height / 2 +
            getRandom(-5, 5);
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
                opacity: `0.03`,
              }}
              key={i}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={style.container}>
      <Component i={1} globalWidth={globalWidth} />
    </div>
  );
}

export default function CircleColor4() {
  return (
    <div className={style.whole}>
      {
        <>
          <CircleGrid globalWidth={50} />
        </>
      }
    </div>
  );
}
