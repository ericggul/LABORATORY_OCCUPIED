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
  const webCamRef = useRef<any>(null);

  //size control
  const size = useMemo(
    () =>
      width / height > 0.5625
        ? { width: width, height: width * 0.5625 }
        : { width: height * 1.6, height: height },
    [width, height]
  );

  return (
    <S.Container>
      <Webcam
        audio={false}
        ref={webCamRef}
        height={size.height}
        width={size.width}
        videoConstraints={{
          width: size.width,
          height: size.height,
          facingMode: "user",
        }}
      />

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
    for (let i = 0; i < this.layerNumber; i++) {
      this.layerSets.push(
        new Layer(
          getRandom(0, this.stageWidth),
          this.stageHeight * (0.2 + (0.6 * i) / this.layerNumber)
        )
      );
    }

    this.then = Date.now();
    this.initial = Date.now();

    this.draw();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    this.elapsedTime = this.now - this.initial;
    const delta = this.now - this.then;
    if (delta > 3) {
      this.draw();
    }
    this.then = this.now;
  }

  draw() {
    this.layerSets.map((layer: any) => layer.draw(this.ctx, this.elapsedTime));
  }

  capture() {}
}

class Layer {
  centerX: number;
  centerY: number;

  colSize: number;
  rowSize: number;
  colNum: number;
  rowNum: number;

  squares: any;

  constructor(centerX: any, centerY: any) {
    this.colSize = getRandom(45, 55);
    this.rowSize = getRandom(10, 12.5);
    this.colNum = Math.random() < 0.3 ? 2 : Math.random() < 0.3 ? 6 : 4;
    this.rowNum = Math.floor(getRandom(30, getRandom(35, 40)));

    this.centerX = centerX;
    this.centerY = centerY;

    this.squares = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.colNum; j++) {
        this.squares.push(
          new Square(
            this.colSize,
            this.rowSize,
            this.centerX + (j - (this.colNum - 1) / 2) * this.colSize,
            this.centerY + (i - (this.rowNum - 1) / 2) * this.rowSize,
            {
              r: getRandom(0, 10),
              g: getRandom(30, 40),
              b: getRandom(40, 70),
            }
          )
        );
      }
    }
  }

  draw(ctx: any) {
    this.squares.map((sq: any, i: number) => sq.draw(ctx));
  }
}

class Square {
  width: number;
  height: number;
  x: number;
  y: number;

  color: any;

  constructor(width: number, height: number, x: number, y: number, color: any) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx: any) {
    const g = ctx.createRadialGradient(
      0,
      0,
      0,
      getRandom(-this.width / 3, this.width / 3),
      getRandom(-this.height / 3, this.height / 3),
      this.width
    );

    g.addColorStop(
      0,
      `rgba(${this.color.r},${this.color.g},${this.color.b},0.2)`
    );
    g.addColorStop(
      1,
      `rgba(${this.color.r},${this.color.g},${this.color.b},0.06)`
    );

    ctx.fillStyle = g;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.restore();
  }
}
