import style from "./ArchivedPage.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

interface SectorProps {
  title: any;
  child: any;
}

function Sector({ title, child }: SectorProps) {
  return (
    <div className={style.sector}>
      <div className={style.title}>{title}</div>
      <div className={style.childContainer}>
        {child.map((val: any, i: any) => {
          const red_val = val.includes("(sig)") ? val.substring(5) : val;
          return (
            <Link to={`/${red_val}`} style={{ textDecoration: "none" }}>
              <div
                className={style.child}
                key={i}
                style={{
                  color: `${
                    val.includes("(sig)") ? "rgb(214, 127, 127)" : "#aaa"
                  }`,
                }}
              >
                {red_val}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

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

  const archived = [
    {
      title: "square",
      child: [
        "(sig)persian",
        "square",
        "square2",
        "square3",
        "square5",
        "square6",
        "square7",
        "square8",
        "square9",
        "square10",
        "square11",
        "square12",
        "square13",
        "square14",
      ],
    },
    {
      title: "white monuments",
      child: [
        "(sig)whitemonumentstest",
        "whitemonuments1",
        "whitemonuments2",
        "whitemonuments3",
        "whitemonuments4",
        "whitemonuments5",
        "whitemonuments6",
        "whitemonuments7",
        "whitemonuments8",
        "whitemonuments9",
        "whitemonuments10",
        "whitemonuments11",
        "whitemonuments12",
        "whitemonuments13",
      ],
    },
    { title: "U", child: ["UR1", "(sig)UGrid", "URScreen"] },
    {
      title: "straight",
      child: ["straight1", "straight2", "straight3", "(sig)straightblue"],
    },
    {
      title: "grid",
      child: [
        "grid1",
        "grid2",
        "grid3",
        "grid4",
        "grid5",
        "grid6",
        "grid7",
        "grid8",
        "grid9",
        "grid10",
        "grid11",
        "grid12",
        "(sig)grid13",
        "gridrose",
        "gridcolor",
      ],
    },
    { title: "depth", child: ["depth2", "depth3"] },
    {
      title: "circle",
      child: [
        "circle1",
        "circle2",
        "circle3",
        "circle4",
        "circle5",
        "circle6",
        "circle7",
        "circle8",
        "circle9",
        "circle10",
        "circle11",
        "circlecolor",
        "circlecolor2",
        "circlecolor3",
        "circlecolor4",
        "circlegrid1",
        "circlegrid2",
        "circlegrid3",
        "circlegrid4",
      ],
    },
    {
      title: "chandelier",
      child: ["chandelier1", "chandelier2", "chandelier3"],
    },
    { title: "neon", child: ["neon1", "neon2", "neon4", "neon5"] },
    { title: "numbers", child: ["241", "242", "243", "773", "991"] },
    {
      title: "others",
      child: ["area", "color1", "color2", "facade1", "monet", "loent"],
    },
  ];

  return (
    <>
      <div className={style.container}>
        {archived.map((e, i) => (
          <Sector title={e.title} child={e.child} key={i} />
        ))}
      </div>
      <div className={style.footer}>Laboratory Occupied</div>
    </>
  );
}

export default MainPage;
