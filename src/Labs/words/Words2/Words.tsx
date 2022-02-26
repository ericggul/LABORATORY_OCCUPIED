import style from "./Words.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "../../../functions/timer";
import classNames from "classnames";

function Words() {
  const text = "에즈키봉 레제키모스 데제스키모 모제스키 ";

  const adjustRef = useRef<any>(null!);

  // const resizing = useCallback(
  //   (e: any) => {
  //     console.log(adjustRef.current);
  //   },
  //   [adjustRef]
  // );

  // useEffect(() => {
  //   adjustRef.current.addEventListener("resize", console.log("hey"));
  //   return () =>
  //     adjustRef.current.removeEventListener("resize", console.log("hey"));
  // }, [adjustRef]);

  return (
    <div className={style.container}>
      <div className={style.adjustable} ref={adjustRef}>
        {text.repeat(500)}
      </div>
    </div>
  );
}

export default Words;
