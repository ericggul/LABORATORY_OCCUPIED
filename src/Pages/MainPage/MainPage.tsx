import style from "./MainPage.module.scss";
import { useState, useEffect } from "react";
import { LIST } from "./data";

const Element = ({ el }: any) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (el.link) {
      window.open(`https://laboratory-occupied.com${el.link}`, "_blank");
    }
  };

  return (
    <div
      className={style.elContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img className={style.pic} src={el.img} alt={el.title} />

      <div className={style.hoverViewer} onClick={handleClick}>
        <div className={style.title}>{el.title}</div>
        <div className={style.link}>
          {el.link ? "Visit Project" : "No Project Link"}
        </div>
      </div>
    </div>
  );
};

const RowContainer = ({ data }: any) => {
  return (
    <div className={style.rowContainer}>
      <div className={style.keyInfo}>
        <div className={style.header}>{data.header}</div>
        <div className={style.year}>{data.year + "/" + data.type}</div>
      </div>
      <div className={style.listContainer}>
        {data.lists.map((el: any, i: any) => (
          <Element key={i} el={el} />
        ))}
      </div>
    </div>
  );
};

function MainPage() {
  return (
    <div className={style.container}>
      <div className={style.mainHeader}>
        <div className={style.title}>Laboratory.Occupied</div>
        <div className={style.mainText}>
          <div className={style.mainTextRow}>
            :a set of Experimentory Web Drawings,
          </div>
          <div className={style.mainTextRow}>
            :aiming to expand the boundary of expressions.
          </div>
        </div>
      </div>

      {LIST.map((data, i) => (
        <RowContainer data={data} key={100 + i} />
      ))}

      <div
        className={style.footer}
        onClick={() => window.open("http://portfolio-jyc.org", "_blank")}
      >
        Copyright &#169; 2022 Jeanyoon Choi
      </div>
    </div>
  );
}

export default MainPage;
