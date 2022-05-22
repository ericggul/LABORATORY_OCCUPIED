import style from "./style.module.scss";
import { useEffect, useState, useMemo } from "react";
import getShitga from "../../utils/getShitga";
import { fibonacci } from "../../utils/fibonacci";
import { numberParse } from "../../utils/numberParse";
import useResize from "../../../../../hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const SingleSeries = ({ salesData, pos }: any) => {
  const [show, setShow] = useState(false);

  const opacity = useMemo(() => getRandom(0.1, 1), []);
  const fontSize = useMemo(() => 1, []);
  const color = useMemo(() => `hsl(166, 100%, ${getRandom(61, 100)}%)`, []);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setShow(true);
    }, getRandom(getRandom(2000, 5000), 15000));

    return () => clearTimeout(timeout);
  }, [salesData]);
  return (
    <div
      className={style.singleSeries}
      style={{
        left: `${pos.x}px`,
        color,
        fontSize: `${fontSize}rem`,
      }}
    >
      {salesData >= 15 &&
        show &&
        new Array(salesData - 15).fill(0).map((_, index) => (
          <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <span>{numberParse(fibonacci(index + 16))}</span>
          </div>
        ))}
    </div>
  );
};

export default function TimeSeriesSector() {
  const [salesData, setSalesData] = useState(1);
  const [windowWidth, windowHeight] = useResize();

  async function setSales() {
    let retrivedSales = await getShitga();
    setSalesData(retrivedSales);
  }

  useEffect(() => {
    setSales();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>싯가</h1>
        <p>작품 가격 추세</p>
      </div>

      <div className={style.footer}>
        청년미술상점 싯가에서 판매하는 작품 당 가격은 싯가로 결정됩니다.
      </div>

      {salesData >= 15 &&
        new Array(salesData - 15).fill(0).map((_, index) => (
          <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <span>{numberParse(fibonacci(index + 16))}</span>
          </div>
        ))}

      {salesData >= 15 &&
        new Array(200).fill(0).map((e, i) => (
          <SingleSeries
            salesData={salesData}
            key={i}
            pos={{
              x: getRandom(-50, windowWidth - 50),
              y: getRandom(0, windowHeight - 200),
            }}
          />
        ))}
    </div>
  );
}
