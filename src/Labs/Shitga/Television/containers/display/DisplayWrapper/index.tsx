import { useEffect, useState } from "react";
import Display from "../Display";
import retriveData from "./retriveData";
import style from "../Display/style.module.scss";

export default function DisplayWrapper() {
  const [loaded, setLoaded] = useState(false);

  const [UIMode, setUIMode] = useState(0);

  const [render, setRender] = useState(false);
  const [item, setItem] = useState<any>(null);
  const handleRetrive = async () => {
    let data = await retriveData();
    setUIMode(1);
    setItem(data);
    setLoaded(true);
    setTimeout(() => {
      setUIMode(2);
    }, 4000);
    setTimeout(() => {
      setRender(true);
    }, 10000);
  };

  useEffect(() => {
    handleRetrive();
  }, []);
  return (
    <div className={style.container}>
      {!loaded ? (
        <h1>Loading Television</h1>
      ) : !render ? (
        UIMode === 1 ? (
          <div className={style.expl}>
            <h1>{"텔레비전에 내가 나왔으면"} </h1>
            <h1>{"정말 좋겠네 정말 좋겠네"} </h1>
          </div>
        ) : (
          <div className={style.expl}>
            <div>
              <h1>{`NickName: ${
                item && item.nickname ? item.nickname : "London"
              }`}</h1>
            </div>
          </div>
        )
      ) : (
        <Display url={item && item.imageUrl ? item.imageUrl : null} />
      )}
    </div>
  );
}
