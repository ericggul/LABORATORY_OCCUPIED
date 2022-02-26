import style from "./ArtNoveau.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";

function ArtNoveau() {
  const text = "Saturday Night Live starring Williams";

  const Square = () => {
    return <div className="square0"></div>;
  };

  useEffect(() => {
    async function* asyncGenerator() {
      var i = 0;
      while (i < 10) {
        yield i++;
      }
    }

    function delay() {
      return new Promise((resolve) => setTimeout(resolve, 300));
    }

    var loc_array = [{ top: 1 / 3, left: 1 / 3 }];
    var next_array: any[] = [];
    var multiplier = [1 / 3, 4 / 3, 4 / 3, 7 / 3];

    async function appendLoop(i: number) {
      for (var j = 0; j < 4 ** (i - 1); j++) {
        const this_loc = loc_array[j];

        next_array.push({
          top: (this_loc.top * 1) / 3,
          left: (this_loc.left * 4) / 3,
        });
        next_array.push({
          top: (this_loc.top * 4) / 3,
          left: (this_loc.left * 1) / 3,
        });
        next_array.push({
          top: (this_loc.top * 4) / 3,
          left: (this_loc.left * 7) / 3,
        });
        next_array.push({
          top: (this_loc.top * 7) / 3,
          left: (this_loc.left * 4) / 3,
        });

        const n = document.createElement("div");
        n.setAttribute("className", `square`);
        n.setAttribute(
          "style",
          `width: ${100 * (1 / 3) ** i}vw; 
                    height: ${100 * (1 / 3) ** i}vh; 
                    background: black; 
                    position: absolute;
                    top: ${this_loc.top * 100}vh;
                    left: ${this_loc.left * 100}vh;
                `
        );

        document.getElementsByClassName("square0")[0].appendChild(n);
      }
      console.log(next_array);
      loc_array = next_array;
    }

    for (var j = 1; j < 8; j++) {
      appendLoop(j);
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.master}>
        <Square />
      </div>
    </div>
  );
}

export default ArtNoveau;
