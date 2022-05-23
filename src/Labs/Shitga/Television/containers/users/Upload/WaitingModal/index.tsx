import style from "./style.module.scss";
import { useState } from "react";

const Modal = () => {
  return (
    <>
      <div className={style.background} />
      <div className={style.modal}>업로드 중...</div>
    </>
  );
};

export default Modal;
