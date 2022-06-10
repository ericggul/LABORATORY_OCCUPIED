import React, { useState, useEffect, useMemo, useRef } from "react";
import * as S from "./styles";
import Webcam from "react-webcam";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function Xism() {
  //canvas
  const [draw, setDraw] = useState<any>(null);
  useEffect(() => {
    setDraw(new Canvas());
  }, []);
  useEffect(() => {
    if (draw) {
      document.addEventListener("click", () => draw.capture());
      return () => document.removeEventListener("click", () => draw.capture());
    }
  }, [draw]);

  //webcamRef
  const { width, height } = useWindowDimensions();

  return (
    <S.Container>
      <div
        id="CanvasWrapper"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          background: "transparent",
        }}
      />
    </S.Container>
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  scale: any;

  //icon numbers
  layerNumber: any;
  layerSets: any;

  //Time Related
  then: any;
  now: any;
  elapsedTime: any;
  initial: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.scale = 1;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.layerNumber = 100;
    this.layerSets = [];

    this.init();
  }

  init() {
    this.then = Date.now();
    this.initial = Date.now();

    this.draw();
  }

  draw() {
    this.layerSets.map((layer: any) => layer.draw(this.ctx, this.elapsedTime));
  }

  capture() {}
}

class Layer {}
