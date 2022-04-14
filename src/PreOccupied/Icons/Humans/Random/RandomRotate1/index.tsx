import React, { useState, useEffect } from "react";

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

    this.layerNumber = 20;
    this.layerSets = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.layerNumber; i++) {
      this.layerSets.push(
        new Layer(
          30,
          this.stageWidth,
          this.stageHeight,
          (i * this.stageHeight) / this.layerNumber
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
    // this.ctx.fillStyle = "white";
    // this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.layerSets.map((layer: any) => layer.draw(this.ctx, this.elapsedTime));
  }

  capture() {
    const data = this.canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = data;
    link.click();
    link.remove();
  }
}

class Layer {
  iconNumber: any;
  iconSets: any;

  stageWidth: any;
  stageHeight: any;

  yPos: any;

  constructor(iconNumber: any, stageWidth: any, stageHeight: any, yPos: any) {
    this.iconNumber = iconNumber;
    this.iconSets = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.yPos = yPos;

    console.log(yPos);
    this.init();
  }

  init() {
    for (let i = 0; i < this.iconNumber; i++) {
      this.iconSets.push(
        new Icon(
          {
            // x: (i * this.stageWidth) / this.iconNumber,
            // y: this.yPos,
            x: getRandom(0, this.stageWidth),
            y: getRandom(0, this.stageHeight),
          },
          {
            x: this.stageWidth * 0.5,
            y: this.stageHeight * 0.5,
          }
        )
      );
    }
  }

  draw(ctx: any, time: any) {
    this.iconSets.map((icon: any) => icon.draw(ctx, time));
  }
}

class Icon {
  pos: any;
  center: any;
  color: any;
  angle: any;
  angleSpeed: any;
  scale: any;

  //shape
  bodyRadius: any;

  margin: any;
  marginSpeed: any;

  constructor(pos: any, center: any) {
    this.pos = pos;
    this.center = center;

    this.angle = getRandom(0, Math.PI * 2);
    this.angleSpeed = getRandom(0.005, getRandom(0.005, 0.02));
    this.scale = 5;
    this.color = {
      h: getRandom(0, 350),
      s: getRandom(30, 40),
      l: getRandom(50, 60),
      a: getRandom(0.3, 0.5),
    };

    this.bodyRadius = getRandom(5, 9);

    this.margin = getRandom(1, 4);
    this.marginSpeed = getRandom(0.005, 0.01);
  }

  draw(ctx: any, time: any) {
    this.margin = Math.sin(time * this.marginSpeed) * 1 + 2;
    this.angle += this.angleSpeed;

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.scale(this.scale, this.scale);

    ctx.fillStyle =
      ctx.strokeStyle = `hsla(${this.color.h},${this.color.s}%,${this.color.l}%, ${this.color.a})`;

    //Circle
    const circleRadius = 5;
    ctx.beginPath();
    ctx.moveTo(0, circleRadius);
    ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);

    ctx.stroke();

    //Body
    const margin = this.margin;
    const radius = this.bodyRadius;
    const height = 8;
    const width = 19;

    ctx.beginPath();
    ctx.moveTo(width / 2, height + margin + circleRadius);
    ctx.lineTo(-width / 2, height + margin + circleRadius);
    ctx.lineTo(-width / 2, margin + radius + circleRadius);
    ctx.quadraticCurveTo(
      -width / 2,
      margin + circleRadius,
      -width / 2 + radius,
      margin + circleRadius
    );
    ctx.lineTo(width / 2 - radius, margin + circleRadius);
    ctx.quadraticCurveTo(
      width / 2,
      margin + circleRadius,
      width / 2,
      margin + radius + circleRadius
    );
    ctx.lineTo(width / 2, height + margin + circleRadius);

    ctx.stroke();

    ctx.restore();
  }
}

export default IconsCanvasTesting;
