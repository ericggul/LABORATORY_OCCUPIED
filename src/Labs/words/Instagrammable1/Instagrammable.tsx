import style from "./Instagrammable.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Component({ i }: Props) {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const [char, setChar] = useState([Math.random() * 26, Math.random() * 26]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.letter1}>
          {String.fromCharCode(65 + Math.floor(char[0]))}
        </div>
        <div className={style.letter2}>
          {String.fromCharCode(65 + Math.floor(char[1]))}
        </div>
      </div>
    </div>
  );
}

export default function Instagrammable() {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  return (
    <div className={style.whole}>
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
      <Component i={1} />
    </div>
  );
}
