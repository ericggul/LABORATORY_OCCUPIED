import style from "./System.module.scss";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import axios from "axios";
import { db } from "../../../utils/firebase/firebase";
import { useState, useEffect, useRef } from "react";
import NumberMover from "./foundations/NumberMover";
import HandsModel from "./foundations/HandsModel";
import { fibonacci } from "./utils/fibonacci";
import { numberParse } from "./utils/numberParse";

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
    currency: "usd",
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
};

function Element({ data }: any) {
  const [traingleUp, setTriangleUp] = useState(
    data.currentPrice > data.prevPrice
  );
  return (
    <div className={style.element}>
      <div className={style.upperRow}>
        <div className={style.header}>{data.header}</div>
        <div
          className={style.mover}
          style={{ color: traingleUp ? "#3affd0" : "#ff3a3a" }}
        >
          <div className={style.triangle}>
            {traingleUp ? (
              <div className={style.triangleUp} />
            ) : (
              <div className={style.triangleDown} />
            )}
          </div>

          <div className={style.moverNumbers}>
            <div className={style.absolute}>
              {numberParse(data.currentPrice - data.prevPrice)}
            </div>
            <div className={style.relative}>{`${(
              ((data.currentPrice - data.prevPrice) / data.prevPrice) *
              100
            ).toFixed(1)}%`}</div>
          </div>
        </div>
      </div>
      <div className={style.lowerRow}>
        <div
          className={style.price}
          style={{
            fontSize:
              numberParse(data.currentPrice).length > 7
                ? "calc(min(1.25vw, 1rem) * 2)"
                : "calc(min(1.25vw, 1rem) * 3)",
          }}
        >
          {numberParse(data.currentPrice)}
        </div>
        <div
          className={style.currency}
          style={{ textTransform: data.capital ? "lowercase" : "uppercase" }}
        >
          {data.currency}
        </div>
      </div>
    </div>
  );
}

export default function Shitga() {
  const [data, setData] = useState(SECTOR_DATA);
  const [displayReady, setDisplayReady] = useState(0);

  const getShitgaData = async () => {
    const snapShot = await getDoc(doc(db, "currentSales", "sales"));
    let salesData = snapShot.data()?.sales;

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

  //XWkRkxGybEPXYnKE8NTV

  const getStockData = async () => {
    try {
      let res = await axios.request({
        method: "GET",
        url: "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=%5EIXIC",
        params: { modules: "defaultKeyStatistics,assetProfile" },
        headers: {
          "x-api-key": "XhdX6TqwVa2pO69OtkAyk1YiRbddlzcC92iqcgxw",
        },
      });

      setData((data) => {
        let temp = data.nasdaq;
        let newObject = {
          ...temp,
          currentPrice: Math.floor(
            res.data.quoteResponse.result[0].regularMarketPrice
          ),
          prevPrice: Math.floor(
            res.data.quoteResponse.result[0].regularMarketPrice -
              res.data.quoteResponse.result[0].regularMarketChange
          ),
        };
        return { ...data, nasdaq: newObject };
      });
      setDisplayReady((displayReady) => displayReady + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async () => {
    const API_KEY = "113e752a131349daffdf50006e58cc6e4fd83702";
    try {
      let res = await axios.request({
        method: "GET",
        url: `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=BTC&interval=1d`,
      });

      setData((data) => {
        let temp = data.bitcoin;
        let newObject = {
          ...temp,
          currentPrice: Math.floor(res.data[0].price),
          prevPrice: Math.floor(
            res.data[0].price - res.data[0]["1d"].price_change
          ),
        };

        return { ...data, bitcoin: newObject };
      });
      setDisplayReady((displayReady) => displayReady + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getDustData = async () => {
    try {
      let res = await axios.request({
        method: "GET",
        url: "https://api.waqi.info/feed/seoul/?token=bdc1d1870e7d445ba1a223e952d5e1d61d8a931f",
      });

      let result = res.data.data.forecast.daily.pm25;
      const today = new Date().getDate();
      const yesterday = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
      ).getDate();

      const parseDate = (given: any) => {
        let str = given.toString();
        return str.length >= 2 ? str : `0${str}`;
      };

      const yesterdayData = result.filter(
        (observ: any) => observ.day.split("-")[2] === parseDate(yesterday)
      )[0].avg;
      const todayData = result.filter(
        (observ: any) => observ.day.split("-")[2] === parseDate(today)
      )[0].avg;

      setData((data) => {
        let temp = data.finedust;
        let newObject = {
          ...temp,
          currentPrice: todayData,
          prevPrice: yesterdayData,
        };

        return { ...data, finedust: newObject };
      });
      setDisplayReady((displayReady) => displayReady + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShitgaData();
    getStockData();
    getCoinData();
    getDustData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.handsModel}>
        <HandsModel />
      </div>
      <div className={style.wrapper}>
        {displayReady > 3 && (
          <>
            <Element data={data.nasdaq} />
            <Element data={data.chanel} />
            <Element data={data.shitga} />
            <Element data={data.bitcoin} />
            <Element data={data.finedust} />
          </>
        )}
      </div>
    </div>
  );
}
