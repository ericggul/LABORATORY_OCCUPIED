import style from "./Words.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "../../../functions/timer";
import classNames from "classnames";
import { clearInterval } from "timers";
const TEXT = "Esquivons Les Ecchymoses des Esquimaux aux Mots Exquis ";
const LENGTH = 16;

const getRandom = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a) + a);

const BlockQuote = () => <blockquote>{TEXT}</blockquote>;
const Strong = () => <strong>{TEXT}</strong>;
const P = () => <p>{TEXT}</p>;
const I = () => <i>{TEXT}</i>;
const BDO = () => <bdo dir="rtl">{TEXT}</bdo>;
const KBD = () => <kbd>{TEXT}</kbd>;
const Q = () => <q>{TEXT}</q>;
const A = () => <a>{TEXT}</a>;
const EM = () => <em>{TEXT}</em>;
const Small = () => <small>{TEXT}</small>;
const S = () => <s>{TEXT}</s>;
const Cite = () => <cite>{TEXT}</cite>;
const DFN = () => <dfn>{TEXT}</dfn>;
const Code = () => <code>{TEXT}</code>;
const U = () => <u>{TEXT}</u>;
const Mark = () => <mark>{TEXT}</mark>;

const Element = () => {
  const [intervalSec, setIntervalSec] = useState(getRandom(200, 2000));
  const [currentElement, setCurrentElement] = useState(getRandom(0, LENGTH));
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentElement((el) => (el + 1) % LENGTH),
      intervalSec
    );
    return () => clearInterval(interval);
  }, []);

  const jsxArray = [
    <Strong />,
    <P />,
    <BlockQuote />,
    <I />,
    <BDO />,
    <KBD />,
    <Q />,
    <A />,
    <EM />,
    <Small />,
    <S />,
    <Cite />,
    <DFN />,
    <Code />,
    <U />,
    <Mark />,
  ];

  return jsxArray[currentElement];
};

function Words() {
  const adjustRef = useRef<any>(null!);

  return (
    <div className={style.container}>
      <div className={style.adjustable} ref={adjustRef}>
        {new Array(500).fill(0).map((e, i) => (
          <Element key={i} />
        ))}
      </div>
    </div>
  );
}

export default Words;
