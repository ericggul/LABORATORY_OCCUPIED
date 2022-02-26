import style from "./Circus.module.scss";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import classNames from "classnames";
import Dancin from "../../assets/Dancin.mp3";

function Circus() {
  const text = "Rrose Sélavy";
  const [clicked, setClicked] = useState(0);
  const [timeArray, setTimeArray] = useState<number[]>([]);
  const [currentSec, setCurrentSec] = useState(0);

  // const audio: HTMLAudioElement = new Audio(Dancin);
  // useEffect(()=>{
  //     var playPromise = audio.play();
  //     if(click){
  //         playPromise.then(_ => {
  //             console.log('playing')
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         })
  //     }
  // }, [click]);

  useEffect(() => {
    const t = new Date().getTime();
    console.log(t);
    setTimeArray([...timeArray, ...[t]]);
  }, []);

  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const getRandomColor = useCallback((i) => {
    const index = Math.abs(i - 1.5);
    return `rgb(${getRandom(200 - index * 100, 305 - index * 60)},${getRandom(
      index,
      index * 100
    )},${getRandom(100 + index * 30, 180 + index * 50)})`;
  }, []);

  const handleChildClick = () => {
    const this_click = new Date().getTime();
    setClicked(this_click);
    setTimeArray((timeArray) => [...timeArray, this_click]);
  };

  useEffect(() => {
    setCurrentSec(
      timeArray[timeArray.length - 1] - timeArray[timeArray.length - 2]
    );
  }, [clicked]);

  console.log(timeArray);

  interface Props {
    i: number;
    time: number;
    parentClick: any;
  }

  const Component = React.memo(({ i, time, parentClick }: Props) => {
    const circleRef = useRef<any>();

    const changeColor = () => {
      circleRef.current.style.backgroundColor = getRandomColor(i % 4);
    };

    const handleClick = (i: number) => {
      parentClick();
      if (typeof circleRef.current !== "undefined") {
        changeColor();

        const interval = setInterval(() => {
          changeColor();
        }, 1000);
        return () => clearInterval(interval);
      }
    };

    console.log(time);

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
                        font-size: 12vw;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        user-select: none;
                        -webkit-user-select: none;
                        -webkit-user-drag: none;
                        margin-top: ${
                          (Math.random() * bundle.length) / 1.5 -
                          bundle.length / 3
                        }vw;
                        margin-left: ${
                          (Math.random() * bundle.length) / 1.5 -
                          bundle.length / 3
                        }vw;
                        transform: rotate(${
                          Math.random() * bundle.length * 12
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
        <div
          className={style.circle}
          ref={circleRef}
          onClick={() => handleClick(i)}
        ></div>
      </div>
    );
  });

  const components = useMemo(() => {
    return new Array(160)
      .fill(0)
      .map((e, i) => (
        <Component
          key={i}
          i={i}
          time={currentSec}
          parentClick={handleChildClick}
        />
      ));
  }, []);

  return <div className={style.container}>{components}</div>;
}

export default Circus;
