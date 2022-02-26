import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";

export default function Sasek() {
  const [shuffled, setShuffled] = useState(0);
  const containerRef = useRef<any>(null);

  const clickHandler = (e: any) => {
    let clickedNode = e.target;

    if (!clickedNode.className.includes("text")) {
      return;
    }
    if (containerRef) {
      let nodeIdx = Array.prototype.indexOf.call(
        containerRef.current.children,
        clickedNode
      );
      setTextArray((textArray) => {
        return [
          ...textArray.slice(0, nodeIdx),
          shuffleString(textArray[nodeIdx]),
          ...textArray.slice(nodeIdx + 1),
        ];
      });
    }
  };

  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  const shuffleString = (string: any) => {
    let randomPos = Math.floor(Math.random() * string.length);
    return Math.random() < 0.4
      ? string.slice(0, randomPos) + string.slice(randomPos)
      : string.slice(randomPos) + string.slice(0, randomPos);
  };

  const [textArray, setTextArray] = useState([
    "사색의 기본조건 ",
    "1. 배가 고프지 않아야한다. ",
    "2. 졸리지 않아야한다. ",
    "위 두 명제는 모순이다. ",
  ]);

  useEffect(() => {
    if (shuffled > 0) {
      setTextArray((textArray) =>
        textArray.map((text: any) => {
          return shuffleString(text);
        })
      );
    }
  }, [shuffled]);

  return (
    <S.Container ref={containerRef}>
      <S.Title className="text">{textArray[0]}</S.Title>
      <S.Sub className="text">{textArray[1]}</S.Sub>
      <S.Sub className="text">{textArray[2]}</S.Sub>
      <S.Conclusion className="text"> {textArray[3]}</S.Conclusion>
    </S.Container>
  );
}
