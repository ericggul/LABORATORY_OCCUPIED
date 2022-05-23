import { useEffect, useState } from "react";
import Display from "../Display";
import retriveData from "./retriveData";
import style from "../Display/style.module.scss";

export default function DisplayWrapper() {
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const [item, setItem] = useState<any>(null);
  const handleRetrive = async () => {
    let data = await retriveData();
    setItem(data);
    setLoaded(true);
    setTimeout(() => {
      setRender(true);
    }, 4000);
  };

  useEffect(() => {
    handleRetrive();
  }, []);
  return (
    <div className={style.container}>
      {!loaded ? (
        <h1>Loading Television</h1>
      ) : !render ? (
        <h1>{`NickName: ${
          item && item.nickname ? item.nickname : "London"
        }`}</h1>
      ) : (
        <Display url={item && item.url ? item.url : null} />
      )}
    </div>
  );
}
