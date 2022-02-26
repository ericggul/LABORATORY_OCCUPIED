import style from "./System.module.scss";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase";
import { useState, useEffect, useRef } from "react";
import NumberMover from "./foundations/NumberMover";
import HandsModel from "./foundations/HandsModel";

const SECTOR_DATA = [{ header: "shitga", currency: "krw" }];

export default function Shitga() {
  const [number, setNumber] = useState(0);

  const getData = async () => {
    const snapShot = await getDoc(doc(db, "currentSales", "sales"));

    setNumber(snapShot.data()?.sales);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.handsModel}>
        <HandsModel />
      </div>
      <div className={style.wrapper}>
        <div className={style.element}>
          <div className={style.upperRow}>
            <div className={style.header}>{SECTOR_DATA[0].header}</div>
            <div className={style.mover}>
              <div className={style.triangle} />
              <div className={style.moverNumbers}>
                <div className={style.absolute}>{"121.393"}</div>
                <div className={style.relative}>{"61.8%"}</div>
              </div>
            </div>
          </div>

          <div className={style.lowerRow}>
            <div className={style.price}>{"317,811"}</div>
            <div className={style.currency}>{SECTOR_DATA[0].currency}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
