import style from "./style.module.scss";
import { useEffect, useRef } from "react";
import { numberParse } from "../../utils/numberParse";

export default function NumberMover({ start, end }: any) {
  const ref = useRef<any>(!null);

  const movingHandler = (start: any, end: any, ref: any) => {
    let now;
    let then = Date.now();

    let delta;

    const options = {
      interval: 5,
      timeOffset: 30,
      speed: 0.07,
    };
    let interval = options.interval;
    let needUpdate = true;

    let currentNumber = start;

    const updateNumber = () => {
      now = Date.now();
      delta = now - then;

      if (delta > interval && needUpdate) {
        then = Date.now();

        if (Math.abs(currentNumber - end) < 1) {
          currentNumber = end;
          needUpdate = false;
          ref.current.innerText = numberParse(currentNumber);
        } else {
          interval += 0.03;
          currentNumber += (end - currentNumber) * options.speed;
          currentNumber = Math.ceil(currentNumber);
          ref.current.innerText = numberParse(currentNumber);
        }
      }
    };

    const update = () => {
      updateNumber();
      requestAnimationFrame(update);
    };

    if (needUpdate && ref.current) {
      update();
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      movingHandler(start, end, ref);
    }
  }, [ref, start, end]);

  return (
    <div className={style.display} style={{ opacity: end === 1 ? 0 : 1 }}>
      <span ref={ref} />
      <span>{"원"}</span>
    </div>
  );
}
