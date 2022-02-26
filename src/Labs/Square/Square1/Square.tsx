import style from "./Square.module.scss";
import { useState } from "react";

function Square() {
  const Component = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
      setClicked(!clicked);
    };
    return (
      <div
        className={clicked ? style.compclicked : style.comp}
        onClick={handleClick}
      ></div>
    );
  };

  return (
    <div className={style.container}>
      {new Array(4000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default Square;
