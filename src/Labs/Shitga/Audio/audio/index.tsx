import style from "./style.module.scss";
import ReactAudioPlayer from "react-audio-player";

export default function Audio() {
  return (
    <div>
      <ReactAudioPlayer
        src="https://laboratory-occupied.com/assets/audio/Author.mp3"
        controls
      />
    </div>
  );
}
