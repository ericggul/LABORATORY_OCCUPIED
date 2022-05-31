import style from "./style.module.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//container
import Header from "../../../../layout/Header";
import DisplayableContainer from "../../display/DisplayableContainer";
import Modal from "../Modal";

//assets
import Writings from "../../../assets/message-square-lines.svg";

import Search from "../../../assets/search.svg";

export default function Main() {
  const navigate = useNavigate();

  const [modalStatus, setModalStatus] = useState("off");

  return (
    <div className={style.container}>
      <Header title="텔레비전" url="/shitga" />
      <div className={style.upper}>
        <div className={style.header}>
          <h2>텔레비전에 내가 나왔으면</h2>
        </div>
        <div className={style.displayable}>
          <DisplayableContainer />
        </div>
        <div className={style.header}>
          <h2>정말 좋겠네 정말 좋겠네</h2>
        </div>
      </div>
      <div
        className={style.button}
        onClick={() => navigate("/television-upload")}
      >
        작품 참여하기
      </div>
      <div className={style.navigatorList}>
        <div
          className={style.navigator}
          onClick={() => setModalStatus("참여 방법")}
        >
          <img src={Search} alt="세부 페이지 링크" />
          {"참여 방법"}
        </div>

        <div
          className={style.navigator}
          style={{ borderBottom: "1px solid white" }}
          onClick={() => setModalStatus("작품 설명")}
        >
          <img src={Writings} alt="세부 페이지 링크" />
          {"작품 설명"}
        </div>
      </div>

      {modalStatus !== "off" && (
        <Modal
          handleModalClose={() => setModalStatus("off")}
          modalStatus={modalStatus}
        />
      )}
    </div>
  );
}
