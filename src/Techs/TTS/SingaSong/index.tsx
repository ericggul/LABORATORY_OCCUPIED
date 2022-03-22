import * as S from "./styles";
import { useState, useEffect } from "react";

export default function SingaSong() {
  const [value, setValue] = useState(1);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const speak = () => {
    let synth = window.speechSynthesis;

    let utterance = new SpeechSynthesisUtterance("heeee haa");
    utterance.pitch = value;
    console.log(value);
    synth.speak(utterance);
  };

  return (
    <S.Container>
      <S.PitchAdjuster value={value} onChange={onChange} />
      <S.Speaker onClick={speak} />
    </S.Container>
  );
}
