import style from "./NestedCircles.module.scss";
import {
  shuffle,
  getRandomFromArray,
  getRandomFromArrayWithWeight,
} from "../../../../functions/arrays";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function NestedCircles() {
  const [draw, setDraw] = useState<any>(null);
  useEffect(() => {
    setDraw(new App());
  }, []);
  useEffect(() => {
    if (draw) {
      document.addEventListener("click", () => draw.capture());
      return () => document.removeEventListener("click", () => draw.capture());
    }
  }, [draw]);

  return <div className={style.container} id="CanvasWrapper"></div>;
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  maximumRadius: any;

  circleSets: any;
  shuffledSets: any;
  circleNum: any;
  subdivision: any;

  temp: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.circleSets = [];

    this.resize();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    this.maximumRadius = Math.min(this.stageHeight, this.stageHeight);
    this.circleNum = 800000;

    this.subdivision = 100;

    for (let sdv = 0; sdv < this.subdivision; sdv++) {
      for (let i = 0; i < this.circleNum / this.subdivision; i++) {
        const radiusRange = getRandomFromArrayWithWeight(
          [
            { min: 0.01, max: 0.02 },
            { min: 0.15, max: 0.2 },
          ],
          [1, 0.1]
        );
        const xRange = getRandomFromArrayWithWeight(
          [
            { min: -0.05, max: 0.2 },

            { min: 0.3, max: 0.5 },
            { min: 0.6, max: 0.65 },
            { min: 0.7, max: 0.81 },
            { min: 0.9, max: 0.98 },
          ],
          [2, 0.4, 0.2, 1, 1]
        );

        const yRange = getRandomFromArrayWithWeight(
          [
            { min: -0.1, max: 1.1 },
            { min: -0.1, max: 0.1 },
            { min: 0.1, max: 0.2 },
            { min: 0.2, max: 0.21 },
            { min: 0.28, max: 0.32 },
            { min: 0.43, max: 0.63 },
            { min: 0.72, max: 0.75 },
            { min: 0.9, max: 1.1 },
          ],
          [1.3, 1, 0.1, 0.4, 0.7, 2, 0.1, 1]
        );
        this.circleSets.push({
          lineWidth: getRandom(0.01, 0.03),
          color: { h: 0, s: 100, l: getRandom(0, 100) },
          radius:
            getRandomFromArray([this.stageHeight, this.stageWidth]) *
            getRandom(radiusRange.min, radiusRange.max),
          x: this.stageWidth * getRandom(xRange.min, xRange.max),
          y: this.stageHeight * getRandom(yRange.min, yRange.max),
        });
      }
    }

    this.shuffledSets = shuffle(this.circleSets);
    this.draw();
  }

  capture() {
    console.log("handling..");
    let dataURL = this.canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;

    link.click();
    console.log("downloaded..");
    link.remove();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.shuffledSets.forEach((e: any) => this.drawSingle(e));
  }

  drawSingle(data: any) {
    this.ctx.beginPath();
    this.ctx.lineWidth = data.lineWidth;
    this.ctx.strokeStyle = `hsl(${data.color.h}, ${data.color.s}%, ${data.color.l}%)`;
    this.ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
