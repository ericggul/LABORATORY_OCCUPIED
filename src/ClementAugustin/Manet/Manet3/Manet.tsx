import style from "./Manet.module.scss";
import ManetImg from "../../images/manet.jpeg";
import { useState, useEffect, useCallback } from "react";
import { LOADIPHLPAPI } from "dns";

const COLOR_SETS = [
  {
    hsl: { h: 58, s: 57, l: 59 },
    ratio: 0.3,
  },
  {
    hsl: { h: 58, s: 3, l: 14 },
    ratio: 0.1,
  },
];

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Manet() {
  useEffect(() => {
    const draw = new Canvas();
  }, []);

  return (
    <>
      <div
        id="CanvasWrapper"
        style={{ width: "100vw", height: "100vh", background: "black" }}
      />
      <img id="source" src={ManetImg} />
    </>
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  imgSource: any;
  imgWidth: any;
  imgHeight: any;

  widthRatio: any;
  heightRatio: any;
  resizeRatio: any;
  widthAdjuster: any;
  heightAdjuster: any;

  interval: any;
  cropper: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.imgSource = document.getElementById("source");
    this.resize();

    this.imgSource.addEventListener("load", () => {
      this.init();
    });

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    console.log("resized");
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.init();
  }

  init() {
    this.imgWidth = this.imgSource.width;
    this.imgHeight = this.imgSource.height;

    this.widthRatio = this.stageWidth / this.imgWidth;
    this.heightRatio = this.stageHeight / this.imgHeight;

    this.resizeRatio = Math.max(this.widthRatio, this.heightRatio);
    this.widthAdjuster =
      (this.imgWidth * this.resizeRatio - this.stageWidth) / 2;
    this.heightAdjuster =
      (this.imgHeight * this.resizeRatio - this.stageHeight) / 2;

    this.draw();
  }

  draw() {
    this.interval = 3;
    this.cropper = 30;
    for (var i = 0; i < this.imgWidth; i = i + this.interval) {
      for (var j = 0; j < this.imgHeight; j = j + this.interval) {
        const angle = getRandom(-50, 50);

        this.ctx.translate(
          i * this.resizeRatio - this.widthAdjuster,
          j * this.resizeRatio - this.heightAdjuster
        );
        this.ctx.rotate((angle * Math.PI) / 180);

        this.ctx.globalAlpha = Math.random() < 0.7 ? getRandom(0.1, 0.5) : 1;

        this.ctx.drawImage(
          this.imgSource,
          this.imgWidth - i,
          j,
          this.cropper,
          this.cropper,
          getRandom(-this.interval, this.interval),
          getRandom(-this.interval, this.interval),
          this.cropper * this.widthRatio,
          this.cropper * this.heightRatio
        );

        if (
          this.imgWidth * 0.2 < i &&
          this.imgWidth * 0.5 > i &&
          this.imgHeight * 0.4 < j &&
          this.imgHeight * 0.8 > j
        ) {
          this.ctx.drawImage(
            this.imgSource,
            i,
            j,
            this.cropper,
            this.cropper,
            getRandom(-this.interval, this.interval),
            getRandom(-this.interval, this.interval),
            this.cropper * this.widthRatio,
            this.cropper * this.heightRatio
          );
        }

        this.ctx.rotate(-(angle * Math.PI) / 180);
        this.ctx.translate(
          -i * this.resizeRatio + this.widthAdjuster,
          -j * this.resizeRatio + this.heightAdjuster
        );
      }
    }
  }
}

export default Manet;
