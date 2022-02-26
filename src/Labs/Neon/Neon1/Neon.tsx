import style from "./Neon.module.scss";
import { useState, useEffect } from "react";

function Neon() {
  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a) + a);
  };

  const getColor = () => {
    return `rgb(${getRandom(200, 255)},${getRandom(0, 250)},${getRandom(
      0,
      250
    )})`;
  };

  const boolRandom = () => {
    return Math.random() > 0.5;
  };

  const [size, setSize] = useState({ height: 0, width: 0 });
  const [show, setShow] = useState(false);

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    setShow(true);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  interface Props {
    x: any;
    y: any;
    horizontal: boolean;
  }
  const Light = ({ x, y, horizontal }: Props) => {
    const single = (t: number) => {
      return `0 0 ${t}px #FF0006`;
    };
    const text = () => {
      var final = `0 0 1px ${getColor()},
            0 0 2px ${getColor()},
            0 0 3px ${getColor()},
            0 0 5px ${getColor()},
            0 0 10px ${getColor()},
            0 0 15px ${getColor()}
    
            `;
      // for(var i=0; i<n; i++){
      //     final += single(i ** 1.7)
      //     if(i<n-1){
      //         final += ','
      //     }
      // }
      return final;
    };
    console.log(text());
    return (
      <div
        className={style.light}
        style={{
          boxShadow: `${text()}`,
          left: x,
          top: y,
          transform: `${!horizontal && `rotate(90deg)`}`,
        }}
      />
    );
  };

  const numbers = Math.floor((size.width * size.height) / 1000);

  return (
    <div className={style.container}>
      {show &&
        new Array(numbers)
          .fill(0)
          .map((e, i) => (
            <Light
              x={getRandom(-300, size.width)}
              y={getRandom(-300, size.height)}
              horizontal={boolRandom()}
            />
          ))}
    </div>
  );
}

export default Neon;
