import style from "./style.module.scss";

import { useState, useEffect, useRef } from "react";

const fibonacci = (a: number) => {
  let curr = 1;
  let prev = 0;
  let prev2 = 0;
  for (let i = 0; i < a; i++) {
    prev2 = curr;
    curr = curr + prev;
    prev = prev2;
  }
  return curr;
};

const numberParse = (input: number) => {
  let output = "";
  if (input < Math.pow(10, 3)) {
    output = input.toString();
  } else {
    let leftOff = input % 1000;
    let leftOffString = leftOff.toString();
    if (leftOff < 10) {
      leftOffString = "00" + leftOff.toString();
    } else if (leftOff < 100) {
      leftOffString = "0" + leftOff.toString();
    }

    const top = (input - leftOff) / 1000;
    output = numberParse(top) + "," + leftOffString;
  }

  return output;
};

const NumberMover = ({ index }: any) => {
  const numberShuffler = (initialNumber: any, targetNumber: any, ref: any) => {
    let time = 0;
    let now;
    let then = Date.now();

    let delta;
    let currentTimeOffset = 0;

    const options = {
      fps: 50,
      timeOffset: 30,
    };

    const initialLength = initialNumber.length;
    const targetLength = targetNumber.length;

    let alterIndex = 0;

    let needUpdate = true;
    const interval = 500 / options.fps;

    const singleDigit = () => Math.floor(Math.random() * 10);

    const generateSingleNumber = (number: any) => {
      const span = document.createElement("span");
      span.innerHTML = number.toString();
      return span;
    };

    const initialize = () => {
      for (let i = 0; i < initialLength; i++) {
        ref.current.append(generateSingleNumber(initialNumber[i]));
      }
    };

    const updateNumber = () => {
      now = Date.now();
      delta = now - then;

      if (delta > interval && needUpdate) {
        then = Date.now();
        currentTimeOffset++;

        if (currentTimeOffset === options.timeOffset && ref.current !== null) {
          const childNodeList = ref.current.childNodes;

          for (let i = 0; i < childNodeList.length - alterIndex; i++) {
            if (childNodeList[i].innerHTML !== ",") {
              if (i === childNodeList.length - alterIndex - 1) {
                childNodeList[i].innerHTML =
                  targetNumber[targetLength - alterIndex - 1];
              } else {
                childNodeList[i].innerHTML = singleDigit();
              }
            }
          }

          if (alterIndex < targetLength) {
            alterIndex++;

            if (childNodeList.length < targetLength) {
              if (
                targetNumber[targetLength - 1 - childNodeList.length] === ","
              ) {
                ref.current.prepend(generateSingleNumber([","]));
              } else {
                ref.current.prepend(generateSingleNumber(1));
              }
            }
            currentTimeOffset = 0;
          } else if (alterIndex === targetLength) {
            needUpdate = false;
          }
        }
        if (currentTimeOffset < options.timeOffset && ref.current !== null) {
          const childNodeList = ref.current.childNodes;
          for (let i = 0; i < childNodeList.length - alterIndex; i++) {
            if (childNodeList[i].innerHTML !== ",") {
              childNodeList[i].innerHTML = singleDigit();
            }
          }
        }
      }
    };

    const update = () => {
      time += 1;
      updateNumber();
      requestAnimationFrame(update);
    };

    if (needUpdate && ref.current) {
      initialize();
      update();
    }
  };

  const numberRef = useRef<any>(null);

  useEffect(() => {
    numberShuffler(
      numberParse(fibonacci(index)),
      numberParse(fibonacci(index + 1)),
      numberRef
    );
  }, [numberRef]);

  return <div className={style.price} ref={numberRef} />;
};

export default NumberMover;
