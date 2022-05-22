import style from "./style.module.scss";
import { useHistory } from "react-router-dom";
import GoBack from "../assets/go-back.svg";

export default function Header({ title, url, backHidden = false }: any) {
  const history = useHistory();

  return (
    <div className={style.container}>
      <img
        className={style.left}
        onClick={() => (url ? history.push(url) : history.goBack())}
        src={GoBack}
        alt="뒤로가기"
        style={{ opacity: backHidden ? 0 : 1 }}
      />
      <div className={style.main}>{title}</div>
      <div className={style.right}>{}</div>
    </div>
  );
}
