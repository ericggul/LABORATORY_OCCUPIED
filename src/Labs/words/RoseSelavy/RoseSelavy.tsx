import style from "./RoseSelavy.module.scss";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

function RoseSelavy() {
  const text = "Rose Sélavy ";

  const text_array = [
    "Rrose Sélavy",
    "Esquivons",
    "Les Ecchymoses",
    "des Esquimaux",
    "aux Mots Exquis",
  ];

  const handleClick = (e: any) => {
    console.log(e.clientX, e.clientY);
    const createNode = () => {
      const n = document.createElement("div");
      n.setAttribute(
        "style",
        `position: absolute; top: ${e.clientY}px; left: ${e.clientX}px; width: 20px; height: 20px; background: black;`
      );
      n.animate([{ background: "white" }, { background: "black" }], {
        duration: 200,
      });
      document.body.appendChild(n);
    };
    createNode();
  };

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
                        font-size: 3vw;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        transform: rotate(${i * 13}deg);`
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
    <div className={style.container} onClick={handleClick}>
      {new Array(160).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default RoseSelavy;
