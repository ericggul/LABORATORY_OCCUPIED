import style from "./Profile.module.scss";
import { useCallback, useState, useEffect } from "react";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const getHexRandom = () => {
  const result = new Array(6)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return result;
};
const generateHex = (i: number) => {
  const initial = parseInt("0305b5", 16);
  return (initial + Math.floor(i / 100)).toString(16);
};
const getColor = () => {
  return `#${getHexRandom()}`;
};

interface picProps {
  name: any;
  handleClick: any;
}

function Dots() {
  return (
    <>
      {new Array(Math.ceil(getRandom(50, 200))).fill(0).map((e, i) => (
        <div
          className={style.circle}
          style={{
            top: `${getRandom(0, 50)}px`,
            left: `${getRandom(0, 50)}px`,
            background: getColor(),
          }}
        />
      ))}
    </>
  );
}

function MultipleCircles() {
  var heights = [];
  heights.push(getRandom(0, 5));
  for (var i = 0; i < 13; i++) {
    heights.push(getRandom(heights[i] + 1, 5 + i * 3));
  }

  return (
    <>
      {heights &&
        heights.map((height, i) => (
          <div
            className={style.circle}
            style={{
              height: `${50 - height}px`,
              width: `${50 - height}px`,
              top: `${height / 2}px`,
              left: `${height / 2}px`,
              background: getColor(),
            }}
            key={i}
          />
        ))}
    </>
  );
}

function RandomCircles() {
  const getHexRandom = useCallback(() => {
    const result = new Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    return result;
  }, []);
  const generateHex = useCallback((i: number) => {
    const initial = parseInt("0305b5", 16);
    return (initial + Math.floor(i / 100)).toString(16);
  }, []);
  const getColor = useCallback(() => {
    return `#${getHexRandom()}`;
  }, []);

  const height = getRandom(20, 30);
  const opacity = getRandom(0.1, 0.4);

  return (
    <>
      {new Array(100).fill(0).map((e, i) => (
        <div
          className={style.circle}
          style={{
            height: `${height}px`,
            width: `${height}px`,
            background: getColor(),
            opacity: opacity,
            top: `${getRandom(-20, 50)}px`,
            left: `${getRandom(-20, 50)}px`,
          }}
        />
      ))}
    </>
  );
}

function ProfilePic({ name, handleClick }: picProps) {
  const onClick = () => {
    alert(`${name} ELIMINATED`);
    handleClick();
  };
  const randomVar = Math.random();
  return (
    <div
      className={style.profilePic}
      style={{
        background: `hsl(${getRandom(0, 350)}, ${getRandom(
          0,
          100
        )}%, ${getRandom(0, 80)}%)`,
      }}
      onClick={onClick}
    >
      {randomVar < 0.3 ? (
        <Dots />
      ) : randomVar < 0.7 ? (
        <MultipleCircles />
      ) : (
        <RandomCircles />
      )}
    </div>
  );
}

function Profile() {
  const [profileName, setProfileName] = useState(
    `${String.fromCharCode(
      44032 + Math.ceil(399 * Math.random()) * 28
    )}${String.fromCharCode(
      44032 + Math.ceil(11172 * Math.random())
    )}${String.fromCharCode(44032 + Math.ceil(399 * Math.random()) * 28)}`
  );

  const handleClick = () => {
    setProfileName(
      `${String.fromCharCode(
        44032 + Math.ceil(399 * Math.random()) * 28
      )}${String.fromCharCode(
        44032 + Math.ceil(11172 * Math.random())
      )}${String.fromCharCode(44032 + Math.ceil(399 * Math.random()) * 28)}`
    );
  };
  return (
    <div className={style.profile}>
      <ProfilePic name={profileName} handleClick={handleClick} />
      <div className={style.profileDescrp}>
        <div className={style.profileName}>{profileName}</div>
        <div className={style.profileLoc}>강남구 삼성동</div>
      </div>
    </div>
  );
}

export default function CircleTesting() {
  var wave: any;
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    console.log("click");
    wave.audioCtx.resume();
    wave.audioElement.play();

    setButtonClicked(true);
  };

  return (
    <div className={style.container}>
      {new Array(1000).fill(0).map((e, i) => (
        <Profile key={i} />
      ))}
    </div>
  );
}
