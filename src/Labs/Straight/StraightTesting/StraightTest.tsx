import style from "./StraightTest.module.scss";
import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import html2canvas from "html2canvas";

export default function StraightTest() {
  const [size, setSize] = useState({ height: 0, width: 0 });

  const getWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  // `hsl(${getRandom(0,20)}, ${getRandom(70,90)}%, ${getRandom(20,40)}%)`,
  // `hsl(${getRandom(300,330)}, ${getRandom(20,30)}%, ${getRandom(50,60)}%)`,

  // `hsl(${getRandom(200,250)}, ${getRandom(30,50)}%, ${getRandom(50,70)}%)`,
  //         `hsl(${getRandom(200,250)}, ${getRandom(30,50)}%, ${getRandom(50,70)}%)`,

  // `hsl(${getRandom(0,40)}, ${getRandom(40,50)}%, ${getRandom(20,40)}%)`,
  // `hsl(${getRandom(200,230)}, ${getRandom(50,60)}%, ${getRandom(60,80)}%)`,

  // `hsl(${getRandom(80,100)}, ${getRandom(40,50)}%, ${getRandom(20,40)}%)`,
  //         `hsl(${getRandom(200,230)}, ${getRandom(30,40)}%, ${getRandom(60,80)}%)`,

  // `hsl(${getRandom(170,190)}, ${getRandom(60,80)}%, ${getRandom(20,40)}%)`,
  //         `hsl(${getRandom(300,330)}, ${getRandom(20,30)}%, ${getRandom(60,80)}%)`,

  const getColor = () => {
    const randomColorArray = [
      `hsl(${getRandom(90, 180)}, ${getRandom(0, 70)}%, ${getRandom(30, 90)}%)`,
      `hsl(${getRandom(200, 210)}, ${getRandom(70, 80)}%, ${getRandom(
        20,
        80
      )}%)`,
      // `hsl(330, ${getRandom(0,100)}%, ${getRandom(0,100)}%)`,
    ];
    return randomColorArray[
      Math.floor(Math.random() * randomColorArray.length)
    ];
  };

  useLayoutEffect(() => {
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resieze", getWindowSize);
  }, []);

  const containerRef = useRef<any>(null);
  const snipping = async () => {
    console.log("reached");
    if (containerRef && containerRef.current) {
      await html2canvas(containerRef.current).then((canvas) => {
        console.log("canvas created");
        let dataURL = canvas.toDataURL("image/png");
        var link = document.createElement("a");
        link.download = "image.png";
        link.href = dataURL;

        link.click();
        console.log("downloaded..");
        link.remove();
      });
    }
  };
  useEffect(() => {
    window.addEventListener("click", snipping);
    return () => window.removeEventListener("click", snipping);
  }, []);

  interface Props {
    height: number;
    color: number;
  }

  const Line = ({ height, color }: Props) => {
    return (
      <div
        className={style.line}
        style={{
          height: `${height}px`,
          marginTop: `${height * 30}px`,
          background: getColor(),
          transform: `rotate(${getRandom(-3, 180)}deg)`,
        }}
      />
    );
  };

  interface CompProps {
    x: number;
    y: number;
    angle: number;
  }

  const Component = ({ x, y, angle }: CompProps) => {
    const height = size.height;
    var len = Math.floor(height);
    var height_array = [];
    var margin_array: number[] = [];
    var left_width = height * 1.5;

    for (var i = 0; i < len; i++) {
      if (left_width >= 0) {
        var this_height = Math.random() * 25;
        var this_margin = 0;
        height_array.push(this_height / 25);
        margin_array.push(this_margin);
        left_width -= this_height;
        left_width -= this_margin;
      } else {
        break;
      }
    }

    return (
      <div
        className={style.box}
        style={{ transform: `translate(${x}px,${y}px) rotate(${angle}deg)` }}
      >
        {height_array.map((val, i) => (
          <Line height={val} color={getRandom(15, 16)} key={i + 100} />
        ))}
      </div>
    );
  };

  return (
    <div className={style.container} ref={containerRef}>
      {new Array(300).fill(0).map((e, i) => (
        <Component
          x={getRandom(-size.width * 0.9, size.width * 0.9)}
          y={getRandom(-size.height * 0.9, size.height * 0.9)}
          angle={getRandom(-1, 1)}
          key={i}
        />
      ))}
    </div>
  );
}
