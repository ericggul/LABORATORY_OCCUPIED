import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import GoBack from "../assets/go-back.svg";

export default function Header({ title, url, backHidden = false }: any) {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <img
        className={style.left}
        onClick={() => (url ? navigate(url) : navigate("/shitga"))}
        src={GoBack}
        alt="뒤로가기"
        style={{ opacity: backHidden ? 0 : 1 }}
      />
      <div className={style.main}>{title}</div>
      <div className={style.right}>{}</div>
    </div>
  );
}
