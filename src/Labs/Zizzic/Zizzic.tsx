import style from "./Zizzic.module.scss";
import { useState, useEffect, useReducer } from "react";

function Zizzic() {
  const [size, setSize] = useState({ height: 1000, width: 300 });

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  const getRandomColor = (start: number[], end: number[]) => {
    const t = Math.random();
    return `rgb(${start[0] * t + end[0] * (1 - t) + Math.random() * 10}, ${
      start[1] * t + end[1] * (1 - t)
    }, ${start[2] * t + end[2] * (1 - t)})`;
  };

  interface Props {
    height: number;
    color: string;
  }

  const Light = ({ height, color }: Props) => {
    return (
      <div
        className={style.light}
        style={{
          height: `${height}px`,
          background: `${color}`,
        }}
      />
    );
  };

  const generator = (a: number) => {
    var height_array: number[] = [];
    var color_array: string[] = [];
    var left_height = a;
    for (var i = 0; i < len; i++) {
      if (left_height >= 0) {
        var this_height = getRandom(0.3, 5);
        var this_color = getRandomColor([103, 155, 110], [200, 230, 180]);
        height_array.push(this_height);
        color_array.push(this_color);
        left_height -= this_height;
      } else {
        break;
      }
    }
    return [height_array, color_array];
  };

  var len = size.height;

  const reducer = (arrays: any, action: any) => {
    switch (action.type) {
      case "Renew":
        return generator(len);
      default:
        return arrays;
    }
  };

  const [arrays, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "Renew" });
    }, 10);
  }, []);

  console.log(arrays);

  // var height_array = [];
  // var color_array: string[] = [];
  // var left_height = size.height;

  // for(var i=0; i<len; i++){
  //     if (left_height>=0){
  //         var this_height = getRandom(0.3,3);
  //         var this_color = `rgb(${getRandom(103,200)}, ${getRandom(155, 230)}, ${getRandom(110, 180)})`;
  //         height_array.push(this_height)
  //         color_array.push(this_color)
  //         left_height -= this_height;
  //     } else{
  //         break
  //     }
  // }

  return (
    <div className={style.container}>
      {arrays &&
        arrays[0].map((_: any, i: number) => (
          <Light height={arrays[0][i]} color={arrays[1][i]} key={i} />
        ))}
    </div>
  );
}

export default Zizzic;
