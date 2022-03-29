import React, { useState, useEffect } from "react";

const PATH =
  "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function IconsCanvasTesting() {
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

  scale: any;

  //icon numbers
  iconNumber: any;

  iconSets: any;

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

    this.iconNumber = 5000;
    this.iconSets = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.iconNumber; i++) {
      this.iconSets.push(
        new Icon(
          {
            x: getRandom(-200, this.stageWidth + 100),
            y: getRandom(-200, this.stageHeight + 100),
          },
          i * 100,
          {
            x: this.stageWidth * getRandom(0.3, 0.6),
            y: this.stageHeight * getRandom(0.3, 0.7),
          }
        )
      );
    }

    this.then = Date.now();
    this.initial = Date.now();

    this.animate();
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
    this.iconSets.map((icon: any) => icon.draw(this.ctx, this.elapsedTime));
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

class Icon {
  pos: any;
  targetPos: any;
  posSpeed: any;
  angle: any;
  targetAngle: any;
  color: any;
  targetColor: any;
  scale: any;
  targetScale: any;
  timeStart: any;

  constructor(pos: any, timeStart: any, initialPos: any) {
    this.pos = initialPos;
    this.posSpeed = 0.01;
    this.angle = 0;
    this.targetPos = pos;
    this.targetAngle = Math.PI * getRandom(4, getRandom(10, 30));
    this.scale = 5;
    this.targetScale = getRandom(3, getRandom(3, 13));
    this.color = `rgba(${getRandom(0, 180)}, ${getRandom(0, 220)}, ${getRandom(
      0,
      255
    )}, ${getRandom(0.02, getRandom(0.05, 0.1))})`;

    this.timeStart = timeStart;
  }

  draw(ctx: any, elapsedTime: any) {
    if (
      elapsedTime > this.timeStart &&
      elapsedTime < this.timeStart + 80 / this.posSpeed
    ) {
      this.pos.x += (this.targetPos.x - this.pos.x) * this.posSpeed;
      this.pos.y += (this.targetPos.y - this.pos.y) * this.posSpeed;
      this.angle += (this.targetAngle - this.angle) * 0.05;
      this.scale += (this.targetScale - this.scale) * 0.1;

      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(this.angle);
      ctx.scale(this.scale, this.scale);
      ctx.fillStyle = ctx.strokeStyle = this.color;

      let p = new Path2D(PATH);
      ctx.stroke(p);

      ctx.restore();
    }
  }
}

export default IconsCanvasTesting;
