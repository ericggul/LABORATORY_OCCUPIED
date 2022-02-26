import style from "./Tone.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";

function Tone() {
  return (
    <div className={style.container}>
      <div className={style.master}></div>
    </div>
  );
}

export default Tone;
