import style from "./Clock2.module.scss";
import { useState, useCallback, useEffect } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import confetti from "canvas-confetti";

interface Props {
  i: number;
}

function fire(particleRatio: any, opts: any) {
  confetti({ ...opts, particleCount: Math.floor(200 * particleRatio) });
}

function confettiFire(xPos: any, yPos: any) {
  fire(0.4, {
    origin: { x: xPos, y: yPos },
    spread: 360,
    startVelocity: 30,
    ticks: 300,
  });
  fire(0.3, {
    origin: { x: xPos - 0.1, y: yPos },
    spread: 360,
    startVelocity: 30,
    ticks: 400,
  });
  fire(0.3, {
    origin: { x: xPos + 0.1, y: yPos },
    spread: 360,
    startVelocity: 30,
    ticks: 300,
  });
}

let colors = ["#C845454", "#38ED87", "#3855ED", "#ED38E6"];

function Clock() {
  //Utils
  const [start, setStart] = useState(false);
  const { width, height } = useWindowDimensions();

  const TOTAL_SECONDS = 90;
  const INTERVAL = 3;
  //Real: calc every 50ms
  const UNIT = (1000 * INTERVAL) / 60;

  const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [superseconds, setSuperSeconds] = useState(0);

  const [fakeTimeNow, setFakeTimeNow] = useState(0.1);
  const [realTimeLeft, setRealTimeLeft] = useState(TOTAL_SECONDS * 60);

  document.addEventListener("click", () => setStart(true));

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (realTimeLeft > 0) {
          setRealTimeLeft((time) => time - INTERVAL);
          setFakeTimeNow(
            (time) =>
              time +
              (((3600 - fakeTimeNow) * getRandom(0.5, 2)) / realTimeLeft) *
                INTERVAL
          );
        }
      }, UNIT);
      return () => clearInterval(interval);
    }
  }, [start, realTimeLeft]);

  useEffect(() => {
    if (realTimeLeft === 0) {
      console.log("here");
      confettiFire(0.5, 0.5);
    }
  }, [realTimeLeft]);

  console.log(realTimeLeft, fakeTimeNow);

  useEffect(() => {
    if (start) {
      setSuperSeconds(Math.floor(fakeTimeNow % 60));
      setSeconds(Math.floor(fakeTimeNow / 60) % 60);
      setMinutes(Math.floor(fakeTimeNow / 3600));
    }
  }, [start, fakeTimeNow]);

  const numberConverter = useCallback((input) => {
    if (input < 10) {
      if (input < 0) {
        return "0";
      }
      return `0${input}`;
    } else {
      return input.toString();
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.number}>
        <div className={style.single}>{numberConverter(minutes)}</div>
        <div className={style.divider}>:</div>
        <div className={style.single}>{numberConverter(seconds)}</div>
        <div className={style.divider}>:</div>
        <div className={style.single}>{numberConverter(superseconds)}</div>
      </div>
      <div className={style.factory}>
        <div className={style.display}>{fakeTimeNow}</div>
        <div className={style.display}>{getRandom(-10, 10)}</div>
      </div>
    </div>
  );
}

export default Clock;
