import { useEffect, useState } from "react";
import getShitga from "../../utils/getShitga";
import { fibonacci } from "../../utils/fibonacci";
import NumberMover2 from "../../foundations/NumberMover";
import style from "./style.module.scss";

//image import
import Shitga from "./assets/shitga.png";

export default function PriceSector() {
  const [salesData, setSalesData] = useState(1);

  async function setSales() {
    let retrivedSales = await getShitga();
    setSalesData(retrivedSales);
  }

  useEffect(() => {
    setSales();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.pic}>
        <img src={Shitga} alt="shitga" />
      </div>
      <div>
        <div className={style.upper}>
          <h1>싯가</h1>
          <h2>작품 당 현재 가격</h2>
        </div>

        <NumberMover2
          start={fibonacci(salesData - 1)}
          end={fibonacci(salesData)}
        />
        <p style={{ marginBottom: "5vh" }}>
          청년미술상점 싯가에서 판매하는 작품 당 가격은 싯가로 결정됩니다.
        </p>
      </div>
    </div>
  );
}
