import style from "./Persian2.module.scss";
import { useState, useCallback, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const getPlusMinus = () => {
  return Math.random() < 0.5 ? -1 : 1;
};

interface Props {
  i: number;
  globalWidth: number;
}

interface GridProps {
  elements: any;
  size: any;
  globalWidth: number;
}

interface ElProps {
  elementNumber: any;
  i: any;
  elements: any;
  rootColor: any;
  size: any;
  globalWidth: any;
}

function Element({
  elementNumber,
  i,
  elements,
  rootColor,
  size,
  globalWidth,
}: ElProps) {
  const inversI = elementNumber - i;
  const getColor = useCallback(() => {
    return `hsl(
        ${getRandom(
          rootColor[0] -
            63 +
            (60 * i) / elementNumber +
            (elements.x * 30) / size.width,
          rootColor[0] -
            57 +
            (60 * i) / elementNumber +
            (elements.x * 30) / size.width
        )},
        ${getRandom(rootColor[1] - 10, rootColor[1] + 10)}%,
        ${getRandom(rootColor[2] - 10, rootColor[2] + 10)}%)`;
  }, [elements]);
  console.log(elements);
  const [height, setHeight] = useState(
    ((Math.min(size.width, size.height) / 4) * inversI) / elementNumber
  );
  const r = globalWidth / 4;
  const [theta, setTheta] = useState(getRandom(0, 360));
  const [background, setBackground] = useState(getColor());
  const [x, setX] = useState(
    globalWidth / 2 - r * Math.cos(i * elements.x) - height / 2
  );
  const [y, setY] = useState(
    globalWidth / 2 - r * Math.sin(theta) - height / 2
  );

  useEffect(() => {
    setBackground(getColor());
    setHeight(
      (((Math.min(size.width, size.height) / 4) * inversI) / elementNumber) *
        (Math.abs(elements.x - size.width / 2) / size.width + 1)
    );
    setX(
      elements.x +
        (elements.x - size.width / 2) *
          0.5 *
          Math.cos((inversI * elements.x * 31) / (elementNumber * size.width)) -
        (elements.x - size.width / 2) *
          0.5 *
          (1 -
            Math.sin(
              (inversI * elements.x * 11) / (elementNumber * size.width)
            )) +
        ((elements.y * size.width) / size.height - size.width / 2) *
          0.4 *
          Math.sin(
            (inversI * elements.y * 11) / (elementNumber * size.height)
          ) -
        ((elements.y * size.width) / size.height - size.width / 2) *
          0.4 *
          Math.sin(
            (inversI * elements.y * 30) / (elementNumber * size.height)
          ) -
        height / 2
    );
    setY(
      elements.y +
        (elements.x - size.width / 2) *
          0.2 *
          Math.cos((inversI * elements.x * 40) / (elementNumber * size.width)) -
        (elements.x - size.width / 2) *
          0.2 *
          (1 -
            Math.sin((inversI * elements.x) / (elementNumber * size.width))) +
        ((elements.y * size.width) / size.height - size.width / 2) *
          0.6 *
          Math.sin(
            (inversI * elements.y * 20) / (elementNumber * size.height)
          ) -
        ((elements.y * size.width) / size.height - size.width / 2) *
          0.6 *
          Math.sin(
            (inversI * elements.y * 10) / (elementNumber * size.height)
          ) -
        height / 2
    );
  }, [elements, globalWidth, elementNumber]);

  return (
    <div
      className={style.square}
      style={{
        height: `${height}px`,
        width: `${height}px`,
        top: `${y}px`,
        left: `${x}px`,
        // border: `1px solid ${getColor()}`,
        background: background,
        opacity: `0.1`,
      }}
    />
  );
}

function CircleGrid({ elements, size, globalWidth }: GridProps) {
  const [rootColor, setRootColor] = useState([
    getRandom(200, 300),
    getRandom(50, 70),
    getRandom(50, 70),
  ]);
  const elementNumber = 900;

  return (
    <div className={style.container}>
      <div
        className={style.comp}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        {new Array(elementNumber).fill(0).map((e, i) => (
          <Element
            elementNumber={elementNumber}
            i={i}
            elements={elements}
            rootColor={rootColor}
            size={size}
            globalWidth={globalWidth}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default function CircleTesting() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ height: 1, width: 1 });
  const [elements, setElements] = useState({ x: 0, y: 1 });
  const getSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getSize();
    setLoading(true);
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resieze", getSize);
  }, []);

  const onMouseMove = (e: any) => {
    setElements({ x: e.clientX || 0, y: e.clientY || 0 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [size]);

  return (
    <div className={style.whole}>
      {loading && (
        <CircleGrid
          elements={elements}
          size={size}
          globalWidth={size.width / 2}
        />
      )}
    </div>
  );
}
