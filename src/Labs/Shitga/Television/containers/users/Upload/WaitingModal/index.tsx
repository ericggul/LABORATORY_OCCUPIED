import style from "./style.module.scss";
import { useEffect, useState } from "react";

const Modal = () => {
  const [messageDisplay, setMessageDisplay] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageDisplay((dp) => (dp + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={style.background} />
      <div className={style.modal}>
        <p>업로드 중...</p>
        {messageDisplay >= 1 && (
          <p>용량이 클 경우 15초 이상 소요될 수 있습니다.</p>
        )}
        {messageDisplay >= 2 && (
          <p>텔레비전에 여러분이 나오는 모습을 상상하세요.</p>
        )}
        {messageDisplay >= 3 && (
          <p>바쁜 일상 속, 예술을 통해 기다림의 가치를 느껴보세요.</p>
        )}
      </div>
    </>
  );
};

export default Modal;
