import style from "./Texture.module.scss";
import { useState, useEffect, useCallback } from "react";

const CENTER = { x: 0.34, y: 0.73 };

const distrub = (): any => {
  return Math.random() * Math.random();
};

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const CONVERT_POS = { x: 0.2, y: 0.3 };
const CONVERT_INTERVAL = { x: 0.1, y: 0.15 };
const CONVERT_INTENSITY = { x: 50, y: 50 };

//Center Square Uniform Generator
const colorGenerator = ({ x, y, mouseX, mouseY }: any) => {
  console.log(mouseY);
  return {
    h:
      getRandom(0, 3) +
      Math.abs(0.5 - y ** 4) * 20 +
      Math.max(
        -(mouseX - (CONVERT_POS.x + CONVERT_INTERVAL.x)) *
          (mouseX - (CONVERT_POS.x - CONVERT_INTERVAL.x)),
        0
      ) *
        (CONVERT_INTENSITY.x * (1 / CONVERT_INTERVAL.x) ** 2),
    l:
      getRandom(0, 1) +
      Math.abs(0.3 - x ** 2) * 70 +
      Math.max(
        -(mouseX - (CONVERT_POS.x + CONVERT_INTERVAL.x)) *
          (mouseX - (CONVERT_POS.x - CONVERT_INTERVAL.x)),
        0
      ) *
        (CONVERT_INTENSITY.x * (1 / CONVERT_INTERVAL.x) ** 2) +
      Math.max(
        -(mouseY - (CONVERT_POS.y + CONVERT_INTERVAL.y)) *
          (mouseY - (CONVERT_POS.y - CONVERT_INTERVAL.y)),
        0
      ) *
        (CONVERT_INTENSITY.y * (1 / CONVERT_INTERVAL.y) ** 2),
  };
};

function LargeTexture() {
  useEffect(() => {
    const draw = new Canvas();
  }, []);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "black" }}
    />
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  textureSize: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
    document.addEventListener("mousemove", (e) =>
      this.draw(e.clientX, e.clientY)
    );
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.textureSize = 20;
    this.init();
  }

  init() {
    for (
      let i = 0;
      i < this.stageWidth + this.textureSize;
      i += this.textureSize
    ) {
      for (
        let j = 0;
        j < this.stageHeight + this.textureSize;
        j += this.textureSize
      ) {
        const { h, l } = colorGenerator({
          x: i / this.stageWidth,
          y: j / this.stageHeight,
          mouseX: 0,
          mouseY: 0,
        });
        this.ctx.beginPath();
        this.ctx.fillRect(i, j, this.textureSize * 2, this.textureSize * 2);
        this.ctx.fillStyle = `hsl(${h}, 50%, ${l}%)`;
      }
    }
  }

  draw(mouseX: any, mouseY: any) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (
      let i = 0;
      i < this.stageWidth + this.textureSize;
      i += this.textureSize
    ) {
      for (
        let j = 0;
        j < this.stageHeight + this.textureSize;
        j += this.textureSize
      ) {
        const { h, l } = colorGenerator({
          x: i / this.stageWidth,
          y: j / this.stageHeight,
          mouseX: mouseX / this.stageWidth,
          mouseY: mouseY / this.stageHeight,
        });
        this.ctx.beginPath();

        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = `hsl(${h}, 50%, ${l}%)`;
        this.ctx.fillRect(
          i - this.textureSize,
          j - this.textureSize,
          this.textureSize * 2,
          this.textureSize * 2
        );
      }
    }
  }
}

export default LargeTexture;
