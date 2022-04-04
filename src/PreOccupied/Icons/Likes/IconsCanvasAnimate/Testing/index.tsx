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

    this.layerNumber = 50;
    this.layerSets = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.layerNumber; i++) {
      this.layerSets.push(
        new Layer(
          400,
          3500 * i,
          {
            r: getRandom(50, 100),
            g: getRandom(100, 150),
            b: getRandom(100, 150),
          },
          this.stageWidth,
          this.stageHeight
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
    this.layerSets.map((layer: any) => layer.draw(this.ctx, this.elapsedTime));
  }

  async capture() {
    // @ts-ignore
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
      ? "video/webm; codecs=vp9"
      : "video/webm";
    let mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime,
    });
    let chunks: any = [];
    mediaRecorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      let blob = new Blob(chunks, {
        type: chunks[0].type,
      });
      let url = URL.createObjectURL(blob);
      let video = document.createElement("video");
      video.src = url;
      let a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      a.click();
    });

    mediaRecorder.start();
  }
}

class Layer {
  iconNumber: any;
  iconSets: any;
  startTime: any;
  colorRange: any;

  stageWidth: any;
  stageHeight: any;

  constructor(
    iconNumber: any,
    startTime: any,
    colorRange: any,
    stageWidth: any,
    stageHeight: any
  ) {
    this.iconNumber = iconNumber;
    this.iconSets = [];
    this.startTime = startTime;
    this.colorRange = [];

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
          this.startTime + getRandom(0, 200),
          {
            x: this.stageWidth * 0.5,
            y: this.stageHeight * 0.5,
          }
        )
      );
    }
  }

  draw(ctx: any, elapsedTime: any) {
    if (elapsedTime > this.startTime) {
      this.iconSets.map((icon: any) => icon.draw(ctx, elapsedTime));
    }
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
    this.posSpeed = 0.02;
    this.angle = 0;
    this.targetPos = pos;
    this.targetAngle = Math.PI * getRandom(10, getRandom(10, 20));
    this.scale = getRandom(1, 4);
    this.targetScale = getRandom(1, getRandom(1, 5));
    this.targetColor = {
      r: getRandom(0, 200),
      g: getRandom(0, 200),
      b: getRandom(100, 150),
      a: getRandom(0.05, 0.1),
    };
    this.color = {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    };

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

      this.color.r +=
        (this.targetColor.r - this.color.r) * 0.1 + getRandom(-10, 10);
      this.color.g += (this.targetColor.g - this.color.g) * 0.07;
      this.color.b += (this.targetColor.b - this.color.b) * 0.07;
      this.color.a += (this.targetColor.a - this.color.a) * 0.07;

      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(this.angle);
      ctx.scale(this.scale, this.scale);

      ctx.fillStyle =
        ctx.strokeStyle = `rgba(${this.color.r},${this.color.g},${this.color.b}, ${this.color.a})`;

      let p = new Path2D(PATH);

      ctx.fill(p);

      ctx.restore();
    }
  }
}

export default IconsCanvasTesting;
