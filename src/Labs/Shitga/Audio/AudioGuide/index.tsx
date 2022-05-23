import style from "./style.module.scss";
import { useMemo } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useParams, useHistory } from "react-router-dom";
import { AUDIO_DATA } from "../Data/data";

import Headphones from "../assets/headphones.svg";
import Header from "../../layout/Header";

export default function Audio() {
  const params = useParams<any>();
  const history = useHistory();

  const audio = useMemo(() => AUDIO_DATA[parseInt(params.idx)], [params]);

  return (
    <div className={style.container}>
      <Header title={audio.title} url="/audio" />

      <div className={style.audios}>
        {AUDIO_DATA.map((audio, i) => (
          <div
            key={i}
            onClick={() => history.push(`/audio-guide/${i}`)}
            style={{
              boxShadow:
                i == params.idx ? "0 0 1rem white" : "0 0 1rem transparent",
            }}
          >
            <img src={Headphones} alt="오디오 가이드" />
            {audio.title}
          </div>
        ))}
      </div>

      <div className={style.audioPlayer}>
        <ReactAudioPlayer src={audio.audio} controls autoPlay />
      </div>

      <div className={style.link}>
        <a
          href={audio.links.url}
          target="_blank"
          rel="noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          <div className={style.button}>{audio.links.description}</div>
        </a>
      </div>
      <div className={style.scriptWrapper}>
        <div className={style.header}>Script</div>
        <div className={style.script}>
          {audio.description.split("\n").map((line: string, idx: number) => {
            return <div key={idx}>{line}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
