import style from "./style.module.scss";
import Link from "../assets/link.svg";

import Header from "../../layout/Header";

export default function Portfolio() {
  return (
    <div className={style.container}>
      <Header title="포트폴리오" url="/main" />

      <div className={style.description}>
        <h1>최정윤 작가</h1>
        <p>
          MA Information Experience Design, Royal College of Art,
          London(2022-2023)
        </p>
        <p>산업공학, 서울대학교, 서울(2018-2022)</p>
        <p>과학영재학교 경기과학고등학교, 경기도(2015-2018)</p>
        <br />

        <p>
          오랫동안 이공계에 몸담아온 최정윤 작가는 공학의 합리주의적 접근에
          회의를 가지고, 공학적 기술이 미학적 목적에 어떻게 적용될 수 있는지에
          관심을 가졌다.
        </p>
        <p>
          그의 작업은 크게 세개 부류로 나뉘어지는데, 웹드로잉을 비롯한 반복성과
          임의성 연구, 웹 매체 연구, 볼테르적 맥락에서 합목적성 비판 및 유희가
          이에 해당된다.
        </p>
      </div>

      <div className={style.navigatorList}>
        <a
          href="https://laboratory-occupied.com/lobby"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          <div className={style.navigator}>
            <img src={Link} alt="세부 페이지 링크" />
            {"웹드로잉 포트폴리오"}
          </div>
        </a>

        <a
          href="http://portfolio-jyc.org"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          <div
            className={style.navigator}
            style={{ borderBottom: "1px solid white" }}
          >
            <img src={Link} alt="세부 페이지 링크" />
            {"일반 포트폴리오"}
          </div>
        </a>
      </div>
    </div>
  );
}
