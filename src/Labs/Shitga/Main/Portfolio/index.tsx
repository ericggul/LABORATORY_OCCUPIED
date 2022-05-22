import style from "./style.module.scss";
import Link from "../assets/link.svg";

import Header from "../../layout/Header";

export default function Portfolio() {
  return (
    <div className={style.container}>
      <Header title="포트폴리오" url="/main" />
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
          href="https://portfolio-jyc.org"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          <div className={style.navigator}>
            <img src={Link} alt="세부 페이지 링크" />
            {"일반 포트폴리오"}
          </div>
        </a>
      </div>
    </div>
  );
}
