import style from "./Monet.module.scss";
import MonetImg from "../../images/monet.jpg";

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

function Monet() {
  useEffect(() => {
    const draw = new Canvas();
  }, []);

  return (
    <>
      <div
        id="CanvasWrapper"
        style={{ width: "100vw", height: "100vh", background: "black" }}
      />
      <img id="source" src={MonetImg} />
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

  time: any;
  vibration: any;
  vibrationSpeed: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.imgSource = document.getElementById("source");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.imgSource.addEventListener("load", () => {
      this.init();
    });
  }

  resize() {
    this.time = 0;
    console.log("resized");
    window.addEventListener("resize", this.resize.bind(this));
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.init();

    this.interval = this.stageWidth / 80;
    this.cropper = this.interval * 40;
  }

  init() {
    this.imgWidth = this.imgSource.width;
    this.imgHeight = this.imgSource.height;

    console.log(this.imgWidth, this.imgHeight);

    this.widthRatio = this.stageWidth / this.imgWidth;
    this.heightRatio = this.stageHeight / this.imgHeight;

    this.resizeRatio = Math.max(this.widthRatio, this.heightRatio);
    this.widthAdjuster =
      (this.imgWidth * this.resizeRatio - this.stageWidth) / 2;
    this.heightAdjuster =
      (this.imgHeight * this.resizeRatio - this.stageHeight) / 2;

    this.vibration = 1;
    this.vibrationSpeed = 0.01;

    this.animate();
  }

  animate() {
    // window.requestAnimationFrame(this.animate.bind(this));
    this.time++;
    this.vibration -= this.vibration * this.vibrationSpeed;

    for (
      var i = -this.interval * 10;
      i < this.imgWidth;
      i = i + this.interval
    ) {
      for (
        var j = -this.interval * 10;
        j < this.imgHeight;
        j = j + this.interval
      ) {
        const angle = 90;
        this.ctx.globalAlpha = 0.01;
        this.ctx.translate(
          i * this.resizeRatio - this.widthAdjuster,
          j * this.resizeRatio - this.heightAdjuster
        );

        this.ctx.rotate((angle * Math.PI) / 180);

        this.ctx.drawImage(
          this.imgSource,
          i,
          j,
          this.cropper * getRandom(0, 1),
          this.cropper * getRandom(0, 1),
          0,
          0,
          this.cropper * this.resizeRatio,
          this.cropper * this.resizeRatio
        );
        this.ctx.rotate(-(angle * Math.PI) / 180);
        this.ctx.translate(
          -i * this.resizeRatio + this.widthAdjuster,
          -j * this.resizeRatio + this.heightAdjuster
        );
        /////
      }
    }
  }
}

export default Monet;
