import style from "./style.module.scss";
import Header from "../../../../layout/Header";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";
import WaitingModal from "./WaitingModal";

import uploadImage from "./uploadFirestore";

export default function Upload() {
  const [imageFile, setImageFile] = useState<any>(!null);
  const [image, setImage] = useState<any>(!null);
  const [imagePresent, setImagePresent] = useState(false);

  //modals
  const [phoneModal, setPhoneModal] = useState(false);
  const [waitingModal, setWaitingModal] = useState(false);

  const navigate = useNavigate();

  const onImageChange = (e: any) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size > 1048576 * 10) {
        alert("이미지 파일은 10MB 이하로 선택해주세요.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);

      reader.addEventListener("load", () => {
        setImage(reader.result);
        setImagePresent(true);

        let img: any = new Image();
        img.src = reader.result;
      });
    }
  };

  const handleSubmit = useCallback(
    async (text: any) => {
      setPhoneModal(false);
      setWaitingModal(true);
      await uploadImage({ image: imageFile, nickname: text });
      alert("업로드 완료!");
      setWaitingModal(false);
      navigate("/television-complete");
    },

    [imageFile]
  );

  return (
    <div className={style.container}>
      <Header title="사진 추가하기" url="/television" />

      <div className={style.header}>
        <h3>
          {imagePresent
            ? "이 사진을 사용할까요?"
            : "텔레비전에 나올 사진을 추가해주세요."}
        </h3>
      </div>

      {imagePresent ? (
        <div className={style.imageWrapper}>
          <img src={image} alt="업로드된 이미지" />
        </div>
      ) : (
        <div className={style.inputWrapper}>
          <input
            className={style.imageInput}
            type="file"
            accept="image/*"
            id="image-input"
            onChange={onImageChange}
          />
          <div className={style.text}>
            {"+  이미지  추가하기"
              .trim()
              .split("")
              .map((t: String, i: number) => (
                <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  {t === " " ? "\u00A0" : t}
                </span>
              ))}
          </div>
        </div>
      )}

      {imagePresent ? (
        <div className={style.buttons}>
          <div onClick={() => setImagePresent(false)}>사진 변경</div>
          <div onClick={() => setPhoneModal(true)}>사진 사용</div>
        </div>
      ) : (
        <div className={style.instruction}>
          <p>
            인물 사진, 풍경 사진 등 텔레비전에 상영될만한 사진을 올려주세요.
          </p>
          <p>정방향 사진을 추천합니다.</p>
        </div>
      )}

      {phoneModal && (
        <Modal
          closeModal={() => setPhoneModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
      {waitingModal && <WaitingModal />}
    </div>
  );
}
