import style from "./style.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QR from "./assets/QR.png";

export default function DisplayFinished() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     navigate("/data-sector");
  //   }, 15000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className={style.container}>
      <h3>참여형 예술</h3>
      <h1>텔레비전에 내가 나왔으면 정말 좋겠네 정말 좋겠네</h1>
      <div className={style.imageWrapper}>
        <img src={QR} alt="QR코드" />
      </div>
      <p>나의 사진도 모니터 위에 송출해보세요.</p>
      <h1>참여링크</h1>
    </div>
  );
}
