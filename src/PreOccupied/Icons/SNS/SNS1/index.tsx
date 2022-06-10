import React, { useState, useEffect, useMemo } from "react";
import {
  AiFillLinkedin,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import useResize from "hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomInt = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a) + a);
const getRandomFromArray = (arr: any[]) => arr[getRandomInt(0, arr.length)];

const WIDTH_DIVIDE = 8;
const HEIGHT_DIVIDE = 8;
const Icon = () => {
  const [windowWidth, windowHeight] = useResize();
  const fontSize = 180;
  const top = useMemo(
    () => (getRandomInt(0, HEIGHT_DIVIDE + 1) / HEIGHT_DIVIDE) * windowHeight,
    [windowHeight]
  );
  const left = useMemo(
    () => (getRandomInt(0, WIDTH_DIVIDE + 1) / WIDTH_DIVIDE) * windowWidth,
    [windowWidth]
  );
  const color = useMemo(
    () =>
      `hsla(${getRandom(180, 280)}, ${getRandom(80, 100)}%, ${getRandom(
        30,
        50
      )}%, 0.5)`,
    []
  );

  return (
    <S.IconWrapper fontSize={fontSize} top={top} left={left} color={color}>
      {getRandomFromArray([
        <AiOutlineTwitter />,
        <AiOutlineGithub />,
        <AiFillInstagram />,
        <FaFacebook />,
        <FaInstagram />,
        <FaTwitter />,
      ])}
    </S.IconWrapper>
  );
};

export default function IconsCanvasTesting() {
  return (
    <S.Container>
      {new Array(300).fill(0).map((_, i) => (
        <Icon key={i} />
      ))}
    </S.Container>
  );
}
