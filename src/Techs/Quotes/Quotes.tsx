import style from "./Quotes.module.scss";
import { useState, useRef, useEffect } from "react";

function Quotes() {
  const quoteRef = useRef<any>();

  const text = "==Ars Electronica==Festival University==Participation==";

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const splitWords = () => {
    const words = text.split(" ");
    var quoteHTML = document.getElementById("quote");
    words.forEach((word) => {
      const createNode = () => {
        const n = document.createElement("span");
        n.innerText = word + " ";
        n.animate(
          [
            {
              opacity: 0,
              filter: `blur(${getRandom(2, 5)}px)`,
            },
            {
              opacity: 1,
              filter: `blur(0px)`,
            },
          ],
          {
            duration: 1000,
            delay: getRandom(500, 2000),
            fill: "backwards",
          }
        );
        quoteRef.current.appendChild(n);
      };
      createNode();
    });
  };

  useEffect(() => {
    splitWords();
  }, []);

  const fadeWords = (words: any[]) => {
    words.forEach((word) => {
      let animate = word.animate(
        [
          {
            opacity: 0,
            filter: `blur(${getRandom(2, 5)}px)`,
          },
          {
            opacity: 1,
            filter: `blur(0px)`,
          },
        ],
        {
          duration: 1000,
          delay: `${getRandom(500, 2500)}`,
          fill: "forwards",
        }
      );
    });
  };

  return (
    <div className={style.container}>
      <div className={style.quote} id="quote" ref={quoteRef} />
    </div>
  );
}

export default Quotes;
