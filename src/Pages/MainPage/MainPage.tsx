import style from "./MainPage.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

const ArtNoveau = {
  header: "Art Noveau",
  year: "2022",
  type: "Static",
  lists: [
    {
      title: "Art Noveau 1",
      img: "/assets/images/1ArtNoveau/1.png",
      url: "/artnoveau1",
    },
    {
      title: "Art Noveau 4",
      img: "/assets/images/1ArtNoveau/4.png",
      url: "/artnoveau4",
    },
    {
      title: "Art Noveau 5",
      img: "/assets/images/1ArtNoveau/5.png",
      url: "/artnoveau5",
    },
    {
      title: "Art Noveau Text 1",
      img: "/assets/images/1ArtNoveau/Text1.png",
      url: "/artnoveautext1",
    },
    {
      title: "Art Noveau Text 3",
      img: "/assets/images/1ArtNoveau/Text3.png",
      url: "/artnoveautext3",
    },
    {
      title: "Art Noveau Text 4",
      img: "/assets/images/1ArtNoveau/Text4.png",
      url: "/artnoveautext4",
    },
  ],
};

const Depth = {
  header: "Depth",
  year: "2021",
  type: "Interactive",
  lists: [
    {
      title: "Depth 2",
      img: "/assets/images/2Depth/2.png",
      url: "/depth2",
    },
    {
      title: "Depth 3",
      img: "/assets/images/2Depth/3.png",
      url: "/depth3",
    },
    {
      title: "Depth 4",
      img: "/assets/images/2Depth/4.png",
      url: "/depth4",
    },
  ],
};

const Straight = {
  header: "Staight",
  year: "2021",
  type: "Static",
  lists: [
    {
      title: "Straight 22",
      img: "/assets/images/3Straight/22.png",
    },
    {
      title: "Straight 24",
      img: "/assets/images/3Straight/24.png",
    },
    {
      title: "Straight 35",
      img: "/assets/images/3Straight/35.png",
    },
    {
      title: "Straight 60",
      img: "/assets/images/3Straight/60.png",
    },
    {
      title: "Straight 66",
      img: "/assets/images/3Straight/66.png",
    },
    {
      title: "Straight 72",
      img: "/assets/images/3Straight/72.png",
    },
    {
      title: "Straight 74",
      img: "/assets/images/3Straight/74.png",
    },
    {
      title: "Straight 81",
      img: "/assets/images/3Straight/81.png",
    },
    {
      title: "Straight 88",
      img: "/assets/images/3Straight/88.png",
    },
    {
      title: "Straight 90",
      img: "/assets/images/3Straight/90.png",
    },
    {
      title: "Straight 99",
      img: "/assets/images/3Straight/99.png",
    },
    {
      title: "Straight 106",
      img: "/assets/images/3Straight/106.png",
    },
  ],
};

const ClementAugustin = {
  header: "Clement Augustin",
  year: "2021",
  type: "Static",
  lists: [
    {
      title: "Manet 1",
      img: "/assets/images/4ClementAugustin/1.png",
      link: "/manet1",
    },
    {
      title: "Manet 3",
      img: "/assets/images/4ClementAugustin/3.png",
      link: "/manet3",
    },
    {
      title: "Manet 4",
      img: "/assets/images/4ClementAugustin/4.png",
      link: "/manet4",
    },
    {
      title: "Manet 8",
      img: "/assets/images/4ClementAugustin/8.png",
      link: "/manet8",
    },
    {
      title: "Manet 11",
      img: "/assets/images/4ClementAugustin/11.png",
      link: "/manet11",
    },

    {
      title: "Monet 2",
      img: "/assets/images/4ClementAugustin/monet2.png",
      link: "/monet2",
    },
    {
      title: "Monet 4",
      img: "/assets/images/4ClementAugustin/monet4.png",
      link: "/monet4",
    },
    {
      title: "Monet 8",
      img: "/assets/images/4ClementAugustin/monet8.png",
      link: "/monet8",
    },
    {
      title: "Monet 9",
      img: "/assets/images/4ClementAugustin/monet9.png",
      link: "/monet9",
    },
  ],
};

const Numbers = {
  header: "Numbers",
  year: "2021",
  type: "Dynamic",
  lists: [
    {
      title: "241",
      img: "/assets/images/5Numbers/241.png",
    },
    {
      title: "242",
      img: "/assets/images/5Numbers/242.png",
    },
    {
      title: "243",
      img: "/assets/images/5Numbers/243.png",
    },
    {
      title: "773",
      img: "/assets/images/5Numbers/773.png",
    },
    {
      title: "991",
      img: "/assets/images/5Numbers/991.png",
    },
  ],
};

const Particles = {
  header: "Particles",
  year: "2022",
  type: "Interactive",
  lists: [
    {
      title: "241",
      img: "/assets/images/5Numbers/241.png",
    },
    {
      title: "242",
      img: "/assets/images/5Numbers/242.png",
    },
    {
      title: "243",
      img: "/assets/images/5Numbers/243.png",
    },
    {
      title: "773",
      img: "/assets/images/5Numbers/773.png",
    },
    {
      title: "991",
      img: "/assets/images/5Numbers/991.png",
    },
  ],
};

function MainPage() {
  return <div className={style.container}></div>;
}

export default MainPage;
