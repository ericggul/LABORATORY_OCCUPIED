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

const Icon = ({ idx }: any) => {
  const [windowWidth, windowHeight] = useResize();
  const fontSize = ((300 - idx) * windowWidth * 2) / 300;
  const rotate = (idx * 360) / 300;
  const top = useMemo(() => windowHeight / 2, [windowHeight]);
  const left = useMemo(() => windowWidth / 2, [windowWidth]);
  const color = useMemo(
    () =>
      `hsla(${getRandom(160, 300)}, ${getRandom(80, 100)}%, ${getRandom(
        30,
        50
      )}%, 0.05)`,
    []
  );

  return (
    <S.IconWrapper
      fontSize={fontSize}
      top={top}
      left={left}
      color={color}
      rotate={rotate}
    >
      <FaTwitter />
      {/* {getRandomFromArray([
        <AiOutlineTwitter />,
        <AiOutlineGithub />,
        <AiFillInstagram />,
        <FaFacebook />,
        <FaInstagram />,
        <FaTwitter />,
      ])} */}
    </S.IconWrapper>
  );
};

export default function SNSTesting() {
  return (
    <S.Container>
      {new Array(300).fill(0).map((_, i) => (
        <Icon key={i} idx={i} />
      ))}
    </S.Container>
  );
}
