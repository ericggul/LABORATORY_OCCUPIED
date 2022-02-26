import style from "./NeonTesting.module.scss";
import { useState, useEffect } from "react";

function NeonTesting() {
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
  const [posArray, setPosArray] = useState<any>({ results: [] });

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
    setPosArray(posGenerator(window.innerWidth, window.innerHeight));
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
    console.log(horizontal);
    return (
      <div
        className={style.light}
        style={{
          // boxShadow: `${text()}`,
          background: `${getColor()}`,
          left: x,
          top: y,
          transform: `${!horizontal && `rotate(90deg)`}`,
        }}
      />
    );
  };

  const posGenerator = (width: number, height: number) => {
    const n = Math.floor((width * height) / 500);
    console.log(n);
    var resArray = [];
    for (var i = 0; i < n; i++) {
      var xTemp = getRandom(-300, width);
      var yTemp = getRandom(-300, height);
      var hor = boolRandom();
      if (hor) {
        if (
          xTemp > width / 3 - 300 &&
          xTemp < (2 * width) / 3 &&
          yTemp > height / 3 - 4 &&
          yTemp < (2 * height) / 3
        ) {
          continue;
        }
        resArray.push({ x: xTemp, y: yTemp, hor: hor });
        console.log(resArray);
      } else {
        if (
          xTemp > width / 3 - 150 &&
          xTemp < (2 * width) / 3 - 150 &&
          yTemp > height / 3 - 150 &&
          yTemp < (2 * height) / 3 + 150
        ) {
          continue;
        }
        resArray.push({ x: xTemp, y: yTemp, hor: hor });
      }
    }
    console.log(resArray);
    return resArray;
  };

  console.log(posArray);

  return (
    <div className={style.container}>
      {show &&
        posArray &&
        posArray.map((val: any, i: any) => (
          <Light x={val.x} y={val.y} horizontal={val.hor} key={i} />
        ))}
    </div>
  );
}

export default NeonTesting;
