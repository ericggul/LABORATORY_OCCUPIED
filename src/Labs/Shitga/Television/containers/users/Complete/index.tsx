import style from "./style.module.scss";

import retriveData from "./retriveData";
import { useState, useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import Link from "../../../assets/link.svg";

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

export default function Complete() {
  const navigate = useNavigate();
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
      {/* <Header title="텔레비전 대기명단" url="/shitga" /> */}
      <div className={style.header}>
        <h3>텔레비전에 내가 나왔으면</h3>
        <h3>정말 좋겠네 정말 좋겠네</h3>

        <p>작품에 참여해주셔서 감사합니다.</p>
        <p>텔레비전에 올려주신 사진이 송출될 때 까지</p>
        <p>약간의 시간이 소요될 수 있습니다.</p>
      </div>

      <div className={style.button} onClick={() => navigate("/shitga")}>
        <img src={Link} alt="link" />
        웹사이트 메인으로 가기
      </div>

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
    </div>
  );
}
