import style from "./MainPage.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

function MainPage() {
  const array = [
    "persian",
    "square",
    "square2",
    "square3",
    "square4",
    "square5",
    "square6",
    "square7",
    "square8",
    "square9",
    "square10",
    "square11",
    "square12",

    "grid1",
    "grid2",
    "grid3",
    "grid4",
    "grid5",
    "grid6",
    "depth",
    "depth2",
    "depth3",
    "linelight",
    "linelight2",
    "243",
    "241",
    "242",
    "991",
    "773",
    "loent",
    "neon",
    "neon2",
    "neon3",
    "neon4",
    "neon5",
    "zizzic",
    "straight",
    "rainbow",
    "words",
    "monet",
    "rotate-permanent",
    "rose-selavy",
    "division",
  ];

  return (
    <div className={style.container}>
      {array.map((val, i) => (
        <Link to={`/${val}`} style={{ textDecoration: "none" }}>
          <div className={style.element}>{val}</div>
        </Link>
      ))}
    </div>
  );
}

export default MainPage;
