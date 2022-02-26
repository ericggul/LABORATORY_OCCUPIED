import style from "./Words.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "../../../functions/timer";
import classNames from "classnames";
import { clearInterval } from "timers";
const TEXT = "Esquivons Les Ecchymoses des Esquimaux aux Mots Exquis ";
const LENGTH = 16;

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Background() {
  return <div className={style.whole}></div>;
}

function Words() {
  const CURRENCIES = ["&#36;"];
  return (
    <div className={style.container} id="CanvasWrapper">
      <code>{CURRENCIES[0]}</code>
    </div>
  );
}
export default Words;
