import style from "./style.module.scss";
import { useMemo } from "react";
import Cancel from "../../../assets/cancel.svg";

//data
import { EXPLANATION } from "./data";

export default function Modal({ handleModalClose, modalStatus }: any) {
  const data = useMemo(
    () => EXPLANATION.filter((expl) => expl.title === modalStatus)[0],
    [modalStatus]
  );

  return (
    <>
      <div className={style.background} onClick={handleModalClose} />
      <div
        className={style.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.cancelButton} onClick={handleModalClose}>
          <img src={Cancel} alt="취소" />
        </div>
        <div className={style.header}>{data.title}</div>
        <div className={style.description}>
          {data.description.split("\n").map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      </div>
    </>
  );
}
