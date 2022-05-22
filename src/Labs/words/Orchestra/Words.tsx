import style from "./Words.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "../../../functions/timer";
import classNames from "classnames";

const TEXT = "Esquivons Les Ecchymoses des Esquimaux aux Mots Exquis ";
const LENGTH = 16;

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const Element = ({ idx }: any) => {
  const [intervalSec, setIntervalSec] = useState(getRandom(100, 1000));
  const [currentElement, setCurrentElement] = useState(
    Math.floor(getRandom(0, LENGTH))
  );
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentElement((el) => (el + 1) % LENGTH),
      intervalSec
    );
    return () => clearInterval(interval);
  }, []);

  return currentElement % LENGTH === 0 ? (
    <a href={`google.com/search?q=${TEXT.split(" ")[idx % 4]}`}>
      {TEXT.split(" ")[idx % 4]}
    </a>
  ) : (
    <span>{TEXT.split(" ")[idx % 4] + " "} </span>
  );
};

function Words() {
  const adjustRef = useRef<any>(null!);

  return (
    <div className={style.container}>
      <div className={style.adjustable} ref={adjustRef}>
        {new Array(1000).fill(0).map((e, i: number) => (
          <Element key={i} idx={i} />
        ))}
      </div>
    </div>
  );
}

export default Words;
