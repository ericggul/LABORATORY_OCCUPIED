import style from "./Clock.module.scss";
import { useState, useCallback, useEffect } from "react";

interface Props {
  i: number;
}

function Clock() {
  const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
  const today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  const [seconds, setSeconds] = useState(today.getSeconds());
  const [velocity, setVelocity] = useState(0.1);
  const [accelerator, setAccelerator] = useState(0);

  console.log(velocity, accelerator);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((sec) => Math.max(0, (sec + velocity) % 60));
      setAccelerator(getRandom(-0.01, 0.01));
      setVelocity((vel) => vel + accelerator);
    }, 100);
    return () => clearInterval(interval);
  }, [accelerator, velocity]);

  const numberConverter = useCallback((input: any) => {
    if (input < 10) {
      return `0${input}`;
    } else {
      return input.toString();
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.number}>
        <div className={style.single}>{numberConverter(hours)}</div>
        <div className={style.divider}>:</div>
        <div className={style.single}>{numberConverter(minutes)}</div>
        <div className={style.divider}>:</div>
        <div className={style.single}>
          {numberConverter(Math.floor(seconds))}
        </div>
      </div>
      <div className={style.factory}>
        <div className={style.display}>{accelerator}</div>
        <div className={style.display}>{velocity}</div>
      </div>
    </div>
  );
}

export default Clock;
