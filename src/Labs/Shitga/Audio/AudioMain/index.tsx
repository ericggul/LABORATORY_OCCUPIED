import style from "./style.module.scss";

import Header from "../../layout/Header";
import { AUDIO_DATA } from "../Data/data";
import Headphones from "../assets/headphones.svg";

import { useNavigate } from "react-router-dom";

import ShitgaContainer from "../../Artworks/ShitgaContainer/Shitga";

export default function Audio() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <Header title="오디오 가이드" url="/main" />

      <div className={style.shitga}>
        <ShitgaContainer />
      </div>

      <div className={style.description}>
        <p>예술의전당 청년미술상점</p>
        <p>2022.05.26-06.31</p>
      </div>
      <div className={style.audioList}>
        {new Array(3).fill(0).map((e, i) => {
          return (
            <div
              className={style.audio}
              key={i}
              onClick={() => navigate(`/audio-guide/${i}`)}
              style={{ animationDelay: `${1 + i * 0.05}s` }}
            >
              <img src={Headphones} alt="오디오 가이드" />
              {AUDIO_DATA[i].title}
            </div>
          );
        })}
      </div>
      <div className={style.caption}>
        모든 오디오가이드는 인공지능 TTS(Text-to-Speech)를 이용해서
        만들어졌습니다.
      </div>
    </div>
  );
}
