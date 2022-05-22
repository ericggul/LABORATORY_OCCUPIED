import style from "./style.module.scss";

import { useState, useEffect, useRef } from "react";
import useResize from "../../../../../hooks/useResize";
import Element from "../../foundations/DataSector/Element";
import HandsModel from "../../foundations/HandsModel";
import { fibonacci } from "../../utils/fibonacci";
import getShitga from "../../utils/getShitga";
import { getCurrency, getBitcoin, getNasdaq } from "../../utils/getData";

const SECTOR_DATA = {
  shitga: { header: "shitga", currency: "krw" },
  chanel: {
    header: "chanel classic",
    currency: "usd",
    currentPrice: 8200,
    prevPrice: 7100,
  },
  bitcoin: {
    header: "bitcoin",
    currency: "krw",
  },
  nasdaq: {
    header: "nasdaq",
    currency: "pts",
  },
  finedust: {
    header: "finedust (pm10)",
    capital: "lowercase",
    currency: <>&#181;&#103;&#8725;&#109;&sup2;</>,
  },
  currency: {
    header: "British Pound",
    currency: "krw/gbp",
  },
};

export default function Shitga() {
  const [windowWidth, windowHeight] = useResize();
  const [data, setData] = useState(SECTOR_DATA);
  const [displayReady, setDisplayReady] = useState(0);

  const getShitgaData = async () => {
    const salesData = await getShitga();

    setData((data) => {
      let temp = data.shitga;
      let newObject = {
        ...temp,
        currentPrice: fibonacci(salesData),
        prevPrice: fibonacci(salesData - 1),
      };

      return { ...data, shitga: newObject };
    });
    setDisplayReady((displayReady) => displayReady + 1);
  };

  const getNasdaqData = async () => {
    const { yesterday, today } = await getNasdaq();

    setData((data) => {
      let temp = data.nasdaq;
      let newObject = {
        ...temp,
        currentPrice: today,
        prevPrice: yesterday,
      };

      return { ...data, nasdaq: newObject };
    });
    setDisplayReady((displayReady) => displayReady + 1);
  };

  const getBitcoinData = async () => {
    const { yesterday, today } = await getBitcoin();

    setData((data) => {
      let temp = data.bitcoin;
      let newObject = {
        ...temp,
        currentPrice: today,
        prevPrice: yesterday,
      };

      return { ...data, bitcoin: newObject };
    });
    setDisplayReady((displayReady) => displayReady + 1);
  };

  const getCurrencyData = async () => {
    const { yesterday, today } = await getCurrency();

    setData((data) => {
      let temp = data.currency;
      let newObject = {
        ...temp,
        currentPrice: today,
        prevPrice: yesterday,
      };

      return { ...data, currency: newObject };
    });
    setDisplayReady((displayReady) => displayReady + 1);
  };

  useEffect(() => {
    getShitgaData();
    getCurrencyData();
    getNasdaqData();
    getBitcoinData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.handsModel}>
        <HandsModel />
      </div>
      {windowWidth < 768 ? (
        <div className={style.wrapper}>
          {displayReady > 3 && (
            <>
              <Element data={data.shitga} />
            </>
          )}
        </div>
      ) : (
        <div className={style.wrapper}>
          {displayReady > 3 && (
            <>
              <Element data={data.currency} />
              <Element data={data.chanel} />
              <Element data={data.shitga} />
              <Element data={data.bitcoin} />
              <Element data={data.nasdaq} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
