import style from "./ArtNoveau.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function ArtNoveau() {
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

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "white" }}
    />
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  squareSets: any;
  squareNumber: any;

  scale: any;

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
    // this.squareNumber = 10000;
    this.squareNumber = 100000;
    this.squareSets = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.squareNumber; i++) {
      this.squareSets.push(
        new Square(
          {
            x: getRandom(0, this.stageWidth),
            y: getRandom(0, this.stageHeight),
          },
          {
            x: getRandom(0, getRandom(0, 100)),
            y: getRandom(0, getRandom(0, 100)),
          }
        )
      );
    }
    this.draw();
  }

  draw() {
    this.squareSets.map((square: any, i: number) => square.draw(this.ctx));
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
}

class Square {
  pos: any;
  size: any;

  interval: any;
  repeat: any;
  colorArrange: any;

  opacity: any;

  constructor(pos: any, size: any) {
    this.pos = pos;
    this.size = size;

    this.repeat = Math.floor(getRandom(30, 100));
    this.interval = { x: getRandom(-5, 5), y: getRandom(-5, 5) };
    this.colorArrange = {
      r: this.size.x,
      g: Math.random() < 0.5 ? this.size.y : 150,
      b: this.size.x + this.size.y + 50,
    };

    this.opacity = 1 / this.repeat;
  }

  draw(ctx: any) {
    console.log("hey");

    for (let i = 0; i < this.repeat; i++) {
      ctx.fillStyle = `rgba(
        ${this.colorArrange.r + getRandom(-30, 30)},  ${
        this.colorArrange.g + getRandom(-30, 30)
      },  ${this.colorArrange.b + getRandom(-30, 30)}, ${this.opacity})`;
      ctx.fillRect(
        this.pos.x - this.size.x / 2 + this.interval.x * i,
        this.pos.y - this.size.y / 2 + this.interval.y * i,
        this.size.x,
        this.size.y
      );
    }
  }
}

export default ArtNoveau;
