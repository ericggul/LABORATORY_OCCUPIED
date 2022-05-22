import style from "./style.module.scss";

import { useHistory } from "react-router-dom";
import useResize from "../../../hooks/useResize";
import ShitgaContainer from "../Artworks/ShitgaContainer/Shitga";

import Link from "./assets/link.svg";
import { DATA } from "./data";

export default function Audio() {
  const [windowWidth, windowHeight] = useResize();

  const history = useHistory();
  return (
    <div className={style.container}>
      <div className={style.introduction}>
        <h1>싯가</h1>

        <p>시가의 잘못된 표현. 흔히 시기에 따라 변하는 물건값을 일컫음.</p>
      </div>

      {windowWidth < 768 && (
        <div className={style.shitga}>
          <ShitgaContainer />
        </div>
      )}

      <div className={style.description}>
        <p>최정윤 작가</p>

        <p>05.26-06.31</p>
        <p>예술의전당 청년미술상점</p>
      </div>
      <div className={style.navigatorList}>
        <p>Link</p>
        {DATA.map((data, i) => {
          return (
            <div
              className={style.navigator}
              key={i}
              onClick={() => history.push(data.url)}
              style={{ animationDelay: `${1.25 + i * 0.05}s` }}
            >
              <img src={Link} alt="세부 페이지 링크" />
              {data.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
