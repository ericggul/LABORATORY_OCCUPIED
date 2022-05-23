import style from "./style.module.scss";

import retriveData from "./retriveData";
import { useState, useEffect, useMemo } from "react";

import QR from "../../assets/QR_TV.png";

function numberParser(num: number) {
  return num < 10 ? `0${num}` : num;
}

function hourMinConverter(now: any, delta: any) {
  let presentMinute = now.getMinutes();
  let presentHour = now.getHours();
  let plus = presentMinute + delta;

  return `${numberParser(presentHour + Math.floor(plus / 60))}:${numberParser(
    plus % 60
  )}`;
}

function minSecondsConverter(min: any, seconds: any) {
  return `${numberParser(min)}분 ${numberParser(seconds)}초`;
}

export default function TelevisionSector() {
  const [now, setNow] = useState(new Date());
  const nextPresentTime = useMemo(() => {
    let presentMinute = now.getMinutes();
    let presentSecond = now.getSeconds();
    let nextMinute = (Math.floor(presentMinute / 5) + 1) * 5;
    return { min: nextMinute - presentMinute, sec: 59 - presentSecond };
  }, [now]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [data, setData] = useState<any>([]);

  async function handleRetrive() {
    const result = await retriveData();
    setData(result.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds));
  }

  useEffect(() => {
    handleRetrive();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>참여형 작품</h1>
        <h1>텔레비전에 내가 나왔으면</h1>
        <h1>정말 좋겠네 정말 좋겠네</h1>
      </div>

      {data && data.length > 0 ? (
        <div>
          <div className={style.indicator}>대기 명단</div>
          <div className={style.table}>
            <div className={style.row}>
              <div className={style.nickname}>닉네임</div>
              <div className={style.expected}>방영 시간</div>
              <div className={style.left}>대기 시간</div>
            </div>

            {data.map((datum: any, i: number) => (
              <div className={style.row} key={i}>
                <div className={style.nickname}>{datum.nickname}</div>
                <div className={style.expected}>
                  {hourMinConverter(now, nextPresentTime.min + i * 5)}
                </div>
                <div className={style.left}>
                  {minSecondsConverter(
                    nextPresentTime.min + i * 5 - 1,
                    nextPresentTime.sec
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={style.qrSector}>
          <div className={style.imageWrapper}>
            <img src={QR} alt="QR코드" />
          </div>
          <h2>텔레비전(이 모니터)에 투영된 내 모습이 궁금하다면?</h2>
          <h1>QR코드로 참여하기</h1>
        </div>
      )}
    </div>
  );
}
