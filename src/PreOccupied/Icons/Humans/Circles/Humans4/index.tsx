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

    this.layerNumber = 40;
    this.layerSets = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.layerNumber; i++) {
      this.layerSets.push(
        new Layer(getRandom(7, 18), this.stageWidth, this.stageHeight)
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
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.layerSets.map((layer: any) => layer.draw(this.ctx, this.elapsedTime));
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

class Layer {
  iconNumber: any;
  iconSets: any;

  stageWidth: any;
  stageHeight: any;

  scale: any;

  constructor(iconNumber: any, stageWidth: any, stageHeight: any) {
    this.iconNumber = iconNumber;
    this.iconSets = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.scale = getRandom(1, getRandom(5, 50));
    this.init();
  }

  init() {
    for (let i = 0; i < this.iconNumber; i++) {
      this.iconSets.push(
        new Icon(
          {
            x: getRandom(-100, this.stageWidth + 50),
            y: getRandom(-100, this.stageHeight + 50),
          },
          {
            x: this.stageWidth * 0.5,
            y: this.stageHeight * 0.5,
          },
          this.scale
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

  constructor(pos: any, center: any, scale: any) {
    this.pos = pos;
    this.center = {
      x: center.x + getRandom(-1, 1),
      y: center.y + getRandom(-1, 1),
    };

    this.angle = getRandom(0, Math.PI * 2);
    this.angleSpeed = getRandom(0.001, getRandom(0, 0.01));
    this.scale = scale;
    this.color = {
      h: getRandom(100, 250),
      s: 0,
      l: 0,
      a: 0.03,
    };

    this.bodyRadius = 8;
  }

  draw(ctx: any, time: any) {
    this.angle += this.angleSpeed;
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
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
    const margin = 2;
    const radius = this.bodyRadius;
    const height = 8;
    const width = 18;

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
    ctx.lineWidth = 0.05;
    ctx.stroke();

    ctx.restore();
  }
}

export default IconsCanvasTesting;
