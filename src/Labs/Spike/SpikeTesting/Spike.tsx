import React, { useEffect, useState, useCallback, useRef } from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Spike() {
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

  elementSets: any;
  elementNumber: any;

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
    this.elementNumber = 2000;
    this.elementSets = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.elementNumber; i++) {
      this.elementSets.push(new Element(this.stageWidth, this.stageHeight));
    }
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    const kill = Math.random() < 0.01;
    this.elementSets.map((el: any, i: number) => el.draw(this.ctx, kill));

    window.requestAnimationFrame(this.draw.bind(this));
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

class Element {
  pos: any;
  size: any;

  time: any;
  opacity: any;

  constructor(stageWidth: any, stageHeight: any) {
    this.pos = {
      x: getRandom(0, stageWidth),
      y: getRandom(0, stageHeight),
    };
    this.size = { x: getRandom(5, 10), y: getRandom(5, 10) };
    this.opacity = Math.random() < 0.1 ? 1 : 0;
  }

  draw(ctx: any, kill: any) {
    this.time++;
    if (Math.random() < 0.001) {
      this.opacity = 1 - this.opacity;
    }
    if (kill) {
      this.opacity = Math.random() < 0.99 ? 1 : 0;
    }

    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;

    ctx.fillRect(
      this.pos.x - this.size.x / 2,
      this.pos.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}

export default Spike;
