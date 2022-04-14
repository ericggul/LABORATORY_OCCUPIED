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

    this.layerNumber = 10;
    this.layerSets = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.layerNumber; i++) {
      this.layerSets.push(new Layer(20, this.stageWidth, this.stageHeight));
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

  constructor(iconNumber: any, stageWidth: any, stageHeight: any) {
    this.iconNumber = iconNumber;
    this.iconSets = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

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

  //
  colorSpeed: any;
  colorAmplitude: any;
  colorLambda: any;

  constructor(pos: any, center: any) {
    this.pos = pos;
    this.center = center;

    this.angle = getRandom(0, Math.PI * 2);
    this.angleSpeed = getRandom(0.005, getRandom(0.005, 0.02));
    this.scale = getRandom(0, getRandom(0, 35));
    this.color = {
      h: (this.scale * 350) / 150,
      s: getRandom(40, 50),
      l: getRandom(30, 70),
      a: getRandom(0.03, 0.08),
    };

    this.bodyRadius = getRandom(4, 8);

    this.colorSpeed = getRandom(0.1, 0.2);
    this.colorAmplitude = getRandom(10, 30);
    this.colorLambda = getRandom(0, Math.PI * 2);
  }

  draw(ctx: any, time: any) {
    this.scale += 0.001;
    this.color.s += Math.sin(time + this.colorLambda) * this.colorAmplitude;
    this.color.l += Math.cos(time + this.colorLambda) * this.colorAmplitude;
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
    ctx.lineWidth = 0.1;
    ctx.stroke();

    //Body
    const margin = 2;
    const radius = this.bodyRadius;
    const height = 8;
    const width = 20;

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
    ctx.lineWidth = 0.1;
    ctx.stroke();

    ctx.restore();
  }
}

export default IconsCanvasTesting;
