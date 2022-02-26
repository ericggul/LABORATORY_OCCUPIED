import * as S from "./styles";
import { useState, useCallback, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

interface Props {
  index: any;
  center: any;
}

const WIDTH = 26;
const HEIGHT = 55;

const ARRAYS = [
  { x: 200, y: 300, angle: 0 },
  { x: 0.6, y: 0.4, angle: 0 },
];

function Elevator({ index, center }: Props) {
  const radius = 300;

  console.log(Math.cos((index * 15 * Math.PI) / 180));

  return (
    <S.Elevator
      top={center.top + radius * Math.cos((index * 15 * Math.PI) / 180)}
      left={center.left + radius * Math.sin((index * 15 * Math.PI) / 180)}
      angle={getRandom(0, 360)}
    />
  );
}

export default function Parking() {
  const [size, setSize] = useState({ height: 1000, width: 300, rad: 150 });
  const [loading, setLoading] = useState(false);
  const getSizeClick = () => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
      rad: Math.min(window.innerHeight, window.innerWidth) * 0.3,
    });
  };

  useEffect(() => {
    getSizeClick();
    window.addEventListener("resize", getSizeClick);
    setLoading(true);
    return () => window.removeEventListener("resieze", getSizeClick);
  }, []);

  return (
    <S.Whole>
      {new Array(24)
        .fill(0)
        .map(
          (e, i) =>
            loading && (
              <Elevator
                index={i}
                center={{ top: size.height / 2, left: size.width / 2 }}
              />
            )
        )}
    </S.Whole>
  );
}
