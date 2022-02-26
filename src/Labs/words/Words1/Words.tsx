import style from "./Words.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";

function Words() {
  const text = "Esquivons les Ecchymoses des";

  const text_array = [
    "Rrose Sélavy",
    "Esquivons",
    "Les Ecchymoses",
    "des Esquimaux",
    "aux Mots Exquis",
  ];

  const randomNumber = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const Component = () => {
    const circleRef = useRef<any>();

    const letters = () => {
      const bundle = text.split("");
      for (var i = 0; i < bundle.length; i++) {
        var syll = bundle[i];
        const createNode = (syll: any, i: number) => {
          const n = document.createElement("span");
          n.innerText = syll;
          n.setAttribute(
            "style",
            `position: absolute;
                        font-size: 10vw;
                        left: ${randomNumber(-50, 50)}vw;
                        top: ${randomNumber(-50, 50)}vh;
                        bottom:${randomNumber(-50, 50)}vh;
                        right: ${randomNumber(-50, 50)}vw;
    
                        transform: rotate(${
                          Math.random() * bundle.length * 37
                        }deg);`
          );
          circleRef.current.appendChild(n);
        };
        createNode(syll, i);
      }
    };

    useEffect(() => {
      letters();
    }, []);

    return (
      <div className={style.box}>
        <div className={style.circle} ref={circleRef}></div>
      </div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(40).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Words;
