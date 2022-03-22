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
      link: "/artnoveau1",
    },
    {
      title: "Art Noveau 4",
      img: "/assets/images/1ArtNoveau/4.png",
      link: "/artnoveau4",
    },
    {
      title: "Art Noveau 5",
      img: "/assets/images/1ArtNoveau/5.png",
      link: "/artnoveau5",
    },
    {
      title: "Art Noveau Text 1",
      img: "/assets/images/1ArtNoveau/Text1.png",
      link: "/artnoveautext1",
    },
    {
      title: "Art Noveau Text 3",
      img: "/assets/images/1ArtNoveau/Text3.png",
      link: "/artnoveautext3",
    },
    {
      title: "Art Noveau Text 4",
      img: "/assets/images/1ArtNoveau/Text4.png",
      link: "/artnoveautext4",
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
      link: "/depth2",
    },
    {
      title: "Depth 3",
      img: "/assets/images/2Depth/3.png",
      link: "/depth3",
    },
    {
      title: "Depth 4",
      img: "/assets/images/2Depth/4.png",
      link: "/depth4",
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
      link: "/241",
    },
    {
      title: "242",
      img: "/assets/images/5Numbers/242.png",
      link: "/242",
    },
    {
      title: "243",
      img: "/assets/images/5Numbers/243.png",
      link: "/243",
    },
    {
      title: "773",
      img: "/assets/images/5Numbers/773.png",
      link: "/773",
    },
    {
      title: "991",
      img: "/assets/images/5Numbers/991.png",
      link: "/991",
    },
  ],
};

const Particles = {
  header: "Particles",
  year: "2022",
  type: "Interactive",
  lists: [
    {
      title: "Particles 2",
      img: "/assets/images/6Particles/2.png",
      link: "/particles2",
    },
    {
      title: "Particles 4",
      img: "/assets/images/6Particles/4.png",
      link: "/particles4",
    },
    {
      title: "Particles 5",
      img: "/assets/images/6Particles/5.png",
      link: "/particles5",
    },
    {
      title: "Particles 12",
      img: "/assets/images/6Particles/12.png",
      link: "/particles12",
    },
    {
      title: "Particles 13",
      img: "/assets/images/6Particles/13.png",
      link: "/particles13",
    },
    {
      title: "Particles 21",
      img: "/assets/images/6Particles/21.png",
      link: "/particles21",
    },
    {
      title: "Particles 23",
      img: "/assets/images/6Particles/23.png",
      link: "/particles23",
    },
    {
      title: "Particles 31",
      img: "/assets/images/6Particles/31.png",
      link: "/particles31",
    },
    {
      title: "Particles 33",
      img: "/assets/images/6Particles/33.png",
      link: "/particles33",
    },
    {
      title: "Particles 34",
      img: "/assets/images/6Particles/34.png",
      link: "/particles34",
    },
  ],
};

const Shitga = {
  header: "Shitga",
  year: "2022",
  type: "Static",
  lists: [
    {
      title: "Shitga 24",
      img: "/assets/images/7Shitga/24.png",
    },
    {
      title: "Shitga 3",
      img: "/assets/images/7Shitga/3.png",
    },
    {
      title: "Shitga 7",
      img: "/assets/images/7Shitga/7.png",
    },
    {
      title: "Shitga 14",
      img: "/assets/images/7Shitga/14.png",
    },
    {
      title: "Shitga 16",
      img: "/assets/images/7Shitga/16.png",
    },
    {
      title: "Shitga 23",
      img: "/assets/images/7Shitga/23.png",
    },
  ],
};

const Monochrome = {
  header: "Monochrome",
  year: "2022",
  type: "Static",
  lists: [
    {
      title: "Monochrome 1",
      img: "/assets/images/8Monochrome/1.png",
      link: "/monochrome1",
    },
    {
      title: "Monochrome 2",
      img: "/assets/images/8Monochrome/2.png",
      link: "/monochrome2",
    },
    {
      title: "Monochrome 4",
      img: "/assets/images/8Monochrome/4.png",
      link: "/monochrome4",
    },
  ],
};

const WhiteMonuments = {
  header: "White Monuments",
  year: "2021",
  type: "Interactive",
  lists: [
    {
      title: "White Monuments",
      img: "/assets/images/9WhiteMonuments/0.png",
      link: "/whitemonumentstest",
    },
    {
      title: "White Monuments 2",
      img: "/assets/images/9WhiteMonuments/2.png",
      link: "/whitemonuments2",
    },
    {
      title: "White Monuments 3",
      img: "/assets/images/9WhiteMonuments/3.png",
      link: "/whitemonuments3",
    },
    {
      title: "White Monuments 5",
      img: "/assets/images/9WhiteMonuments/5.png",
      link: "/whitemonuments5",
    },
    {
      title: "White Monuments 8",
      img: "/assets/images/9WhiteMonuments/8.png",
      link: "/whitemonuments8",
    },
    {
      title: "White Monuments 10",
      img: "/assets/images/9WhiteMonuments/10.png",
      link: "/whitemonuments10",
    },
  ],
};

const Grid = {
  header: "Grid",
  year: "2021",
  type: "Static",
  lists: [
    {
      title: "Grid 4",
      img: "/assets/images/10Grid/4.png",
      link: "/grid4",
    },
    {
      title: "Grid 5",
      img: "/assets/images/10Grid/5.png",
      link: "/grid5",
    },
    {
      title: "Grid 6",
      img: "/assets/images/10Grid/6.png",
      link: "/grid6",
    },
    {
      title: "Grid 7",
      img: "/assets/images/10Grid/7.png",
      link: "/grid7",
    },
    {
      title: "Grid 8",
      img: "/assets/images/10Grid/8.png",
      link: "/grid8",
    },
    {
      title: "Grid 10",
      img: "/assets/images/10Grid/10.png",
      link: "/grid10",
    },
    {
      title: "Grid 11",
      img: "/assets/images/10Grid/11.png",
      link: "/grid11",
    },
    {
      title: "Grid 13",
      img: "/assets/images/10Grid/13.png",
      link: "/grid13",
    },
    {
      title: "Grid Rose",
      img: "/assets/images/10Grid/rose.png",
      link: "/gridrose",
    },
  ],
};

const TiltedGrid = {
  header: "Tilted Grid",
  year: "2021",
  type: "Dynamic",
  lists: [
    {
      title: "Tilted Grid 1",
      img: "/assets/images/11TiltedGrid/1.png",
      link: "/tiltedgrid1",
    },
    {
      title: "Tilted Grid 2",
      img: "/assets/images/11TiltedGrid/2.png",
      link: "/tiltedgrid2",
    },
    {
      title: "Tilted Grid 3",
      img: "/assets/images/11TiltedGrid/3.png",
      link: "/tiltedgrid3",
    },
    {
      title: "Tilted Grid 4",
      img: "/assets/images/11TiltedGrid/4.png",
      link: "/tiltedgrid4",
    },
  ],
};

const AnimatedGrid = {
  header: "Animated Grid",
  year: "2022",
  type: "Dynamic",
  lists: [
    {
      title: "\x6c\x61\x76\x65\x6e\x64\x65\x72",
      img: "/assets/images/12AnimatedGrid/1.png",
      link: "/animatedgrid1",
    },
    {
      title: "rise",
      img: "/assets/images/12AnimatedGrid/2.png",
      link: "/animatedgrid2",
    },
    {
      title: "\x72\x61\x69\x6e\x69\x6e\x67 \x6f\x75\x74\x73\x69\x64\x65",
      img: "/assets/images/12AnimatedGrid/3.png",
      link: "/animatedgrid3",
    },
    {
      title: "\x75\x6e\x74\x69\x74\x6c\x65\x64",
      img: "/assets/images/12AnimatedGrid/4.png",
      link: "/animatedgrid4",
    },
    {
      title: "fall",
      img: "/assets/images/12AnimatedGrid/5.png",
      link: "/animatedgrid5",
    },
  ],
};

const FourPillars = {
  header: "Four Pillars",
  year: "2021",
  type: "Static",
  lists: [
    {
      title: "Four Pillars 1",
      img: "/assets/images/13FourPillars/1.png",
      link: "/fourpillars1",
    },
    {
      title: "Four Pillars 3",
      img: "/assets/images/13FourPillars/3.png",
      link: "/fourpillars3",
    },
    {
      title: "Four Pillars 4",
      img: "/assets/images/13FourPillars/4.png",
      link: "/fourpillars4",
    },
    {
      title: "Four Pillars 5",
      img: "/assets/images/13FourPillars/5.png",
      link: "/fourpillars5",
    },
    {
      title: "Four Pillars 6",
      img: "/assets/images/13FourPillars/6.png",
      link: "/fourpillars6",
    },
    {
      title: "Four Pillars 7",
      img: "/assets/images/13FourPillars/7.png",
      link: "/fourpillars7",
    },
    {
      title: "Four Pillars 8",
      img: "/assets/images/13FourPillars/8.png",
      link: "/fourpillars8",
    },
    {
      title: "Four Pillars 9",
      img: "/assets/images/13FourPillars/9.png",
      link: "/fourpillars9",
    },
    {
      title: "Four Pillars 10",
      img: "/assets/images/13FourPillars/10.png",
      link: "/fourpillars10",
    },
    {
      title: "Four Pillars 11",
      img: "/assets/images/13FourPillars/11.png",
      link: "/fourpillars11",
    },
  ],
};

const Texture = {
  header: "Texture",
  year: "2021",
  type: "Static",
  lists: [
    {
      title: "Texture 1",
      img: "/assets/images/14Texture/1.png",
      link: "/texture1",
    },
    {
      title: "Texture 2",
      img: "/assets/images/14Texture/2.png",
      link: "/texture2",
    },
    {
      title: "Texture 3",
      img: "/assets/images/14Texture/3.png",
      link: "/texture3",
    },
    {
      title: "Texture 5",
      img: "/assets/images/14Texture/5.png",
      link: "/texture5",
    },
  ],
};
const LIST = [
  ArtNoveau,
  Straight,
  Particles,
  Numbers,
  Depth,
  Shitga,
  ClementAugustin,
  Monochrome,
  WhiteMonuments,
  Grid,
  TiltedGrid,
  AnimatedGrid,
  FourPillars,
  Texture,
];

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
    </div>
  );
}

export default MainPage;
