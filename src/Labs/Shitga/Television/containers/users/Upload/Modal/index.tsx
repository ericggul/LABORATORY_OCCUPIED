import style from "./style.module.scss";
import { useState } from "react";

const Modal = ({ closeModal, handleSubmit }: any) => {
  const [text, setText] = useState<any>("");
  return (
    <>
      <div className={style.background} onClick={closeModal} />
      <div className={style.modal} onClick={(ev) => ev.stopPropagation()}>
        <div className={style.header}>
          <h3>닉네임을 입력해주세요</h3>

          {text !== "" ? (
            <p>버튼을 클릭하면 작품 참여가 완료됩니다.</p>
          ) : (
            <p>본 정보는 이미지 식별용 외의 용도로 사용되지 않습니다.</p>
          )}
        </div>
        <div className={style.inputWrapper}>
          <input
            className={style.input}
            type="text"
            spellCheck="false"
            value={text}
            onChange={(e) => {
              if (e.target.value.length >= 8) {
                alert("닉네임은 최대 7자까지만 작성해주세요.");
                return;
              }
              setText(e.target.value);
            }}
            placeholder="닉네임(최대 7자)"
          />
        </div>

        {text !== "" && (
          <div
            className={style.submitButton}
            onClick={() => handleSubmit(text)}
          >
            사진 등록 완료
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
