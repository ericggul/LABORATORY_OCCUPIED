import style from "./style.module.scss";
import { useEffect } from "react";
import TestImg2 from "../../../assets/test2.png";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function Display() {
  useEffect(() => {
    const render = new App(TestImg2);
    return () => {
      render.destroy();
    };
  }, []);
  return (
    <div className={style.container}>
      <div id="wrapper" className={style.wrapper} />
    </div>
  );
}

class App {
  image: any;

  canvas: any;
  tmpCanvas: any;
  wrapper: any;
  ctx: any;
  tmpCtx: any;

  pixelRatio: number;

  stageWidth: any;
  stageHeight: any;

  //pixel
  pixelSize: any;
  radius: any;

  //image
  isLoaded: boolean;
  imgPos: any;
  imgData: any;

  //Dots
  dots: any;
  cols: any;
  rows: any;

  //animation
  animationRequest: any;

  //time
  now: any;
  then: any;
  delta: any;
  interval: any;
  elapsedTime: any;

  constructor(image: any) {
    this.canvas = document.createElement("canvas");
    this.wrapper = document.getElementById("wrapper");
    this.wrapper.appendChild(this.canvas);

    this.tmpCanvas = document.createElement("canvas");
    this.tmpCanvas.setAttribute("style", "opacity: 0");
    this.wrapper.appendChild(this.tmpCanvas);

    this.ctx = this.canvas.getContext("2d");
    this.tmpCtx = this.tmpCanvas.getContext("2d");

    this.pixelRatio = 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.isLoaded = false;
    this.image = new Image();
    this.image.src = image;
    this.image.onload = () => {
      this.isLoaded = true;
      this.drawImage();
    };
  }

  destroy() {
    cancelAnimationFrame(this.animationRequest);
    this.imgData = null;
    this.isLoaded = false;
  }

  resize() {
    this.dots = [];

    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.tmpCanvas.width = this.stageWidth;
    this.tmpCanvas.height = this.stageHeight;

    this.pixelSize = 24;
    this.radius = 10;
    if (this.isLoaded) {
      this.drawImage();
    }
  }

  drawImage() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.image.width / this.image.height;

    this.imgPos = {
      x: 0,
      y: 0,
      width: this.stageWidth,
      height: this.stageHeight,
    };

    //image size adjust
    if (imgRatio < stageRatio) {
      this.imgPos.width = Math.round(
        this.image.width * (this.stageHeight / this.image.height)
      );
      this.imgPos.x = Math.round((this.stageWidth - this.imgPos.width) / 2);
      this.imgPos.y = 0;
    } else {
      this.imgPos.height = Math.round(
        this.image.height * (this.stageWidth / this.image.width)
      );
      this.imgPos.y = Math.round((this.stageHeight - this.imgPos.height) / 2);
      this.imgPos.x = 0;
    }

    //draw image
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );

    this.tmpCtx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );

    //get img data
    this.imgData = this.tmpCtx?.getImageData(
      0,
      0,
      this.stageWidth,
      this.stageHeight
    );

    this.drawDots();
  }

  drawDots() {
    this.dots = [];
    this.cols = Math.ceil(this.imgPos.width / this.pixelSize);
    this.rows = Math.ceil(this.imgPos.height / this.pixelSize);

    for (let i = 0; i < this.rows; i++) {
      const y = (i + 0.5) * this.pixelSize;
      const pixelY =
        Math.max(Math.min(y, this.imgPos.height), 0) + this.imgPos.y;
      for (let j = 0; j < this.cols; j++) {
        const x = (j + 0.5) * this.pixelSize;
        const pixelX =
          Math.max(Math.min(x, this.imgPos.width), 0) + this.imgPos.x;

        //retrive data
        const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;

        const red = this.imgData.data[pixelIndex + 0];
        const green = this.imgData.data[pixelIndex + 1];
        const blue = this.imgData.data[pixelIndex + 2];

        //create dot: to do
        const dot = new Dot(
          { x: x + this.imgPos.x, y: y + this.imgPos.y },
          this.radius,
          this.pixelSize,
          { red, green, blue }
        );
        this.dots.push(dot);
      }
    }

    this.startAnimate();
  }

  startAnimate() {
    this.now = Date.now();
    this.then = Date.now();
    this.interval = 5;
    this.delta = 0;
    this.elapsedTime = 0;
    this.animate();
  }

  animate() {
    //time setting
    this.now = Date.now();
    this.delta = this.now - this.then;

    if (this.delta > this.interval) {
      this.then = Date.now();
      this.elapsedTime++;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
      this.dots.forEach((dot: any) => {
        dot.animate(this.ctx, this.elapsedTime);
      });
    }

    this.animationRequest = requestAnimationFrame(this.animate.bind(this));
  }
}

class Dot {
  pos: any;
  originalRadius: any;

  radius: any;
  radiusTarget: any;
  radiusSpeed: any;
  radiusDelta: any;

  pixelSize: any;
  rgb: any;

  //rotate
  rotation: any;
  rotationSpeed: any;

  //radial corner
  cornerRadius: any;
  cornerRadiusTarget: any;

  cornerSpeed: any;
  cornerDelta: any;

  //color
  colorSpeed: any;
  colorDelta: any;

  blank: boolean;

  constructor(pos: any, radius: any, pixelSize: any, rgb: any) {
    this.pos = pos;

    this.originalRadius = radius;
    this.radiusSpeed = getRandom(0.05, 0.15);
    this.radiusDelta = getRandom(0, 100);
    this.radius = this.originalRadius;
    this.radiusTarget =
      this.originalRadius * (Math.sin(this.radiusDelta) * 0.3 + 0.7);

    this.rotation = 0;
    this.rotationSpeed = getRandom(0.1, 0.15);

    this.cornerRadius = 0;
    this.cornerRadiusTarget = getRandom(0, this.originalRadius);
    this.cornerSpeed = getRandom(-0.01, 0.01);
    this.cornerDelta = getRandom(0, 100);

    this.colorSpeed = (Math.PI * 2) / 50;
    this.colorDelta = getRandom(0, 100);

    this.pixelSize = pixelSize;
    this.rgb = rgb;
    this.blank = false;
  }

  animate(ctx: any, time: any) {
    const t = time - 30;
    let CYCLE = 100;
    const radiusCycle = t % CYCLE;

    if (radiusCycle === 0) {
      this.radiusTarget = this.originalRadius * getRandom(0.4, 1);
    }

    if (radiusCycle > 0 && radiusCycle <= 50) {
      this.radius -= (this.originalRadius - this.radiusTarget) * 0.02;
    } else if (radiusCycle >= 60 && radiusCycle < 80) {
      this.radius += (this.originalRadius - this.radiusTarget) * 0.05;
    }

    ctx.fillStyle = `rgb(${this.rgb.red}, ${this.rgb.green}, ${this.rgb.blue})`;
    this.drawRounded(ctx);
  }

  drawRounded(ctx: any) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation);
    ctx.moveTo(-this.radius, -this.radius + this.cornerRadius);
    ctx.quadraticCurveTo(
      -this.radius,
      -this.radius,
      -this.radius + this.cornerRadius,
      -this.radius
    );
    ctx.lineTo(this.radius - this.cornerRadius, -this.radius);
    ctx.quadraticCurveTo(
      this.radius,
      -this.radius,
      +this.radius,
      -this.radius + this.cornerRadius
    );
    ctx.lineTo(this.radius, this.radius - this.cornerRadius);
    ctx.quadraticCurveTo(
      this.radius,
      this.radius,
      this.radius - this.cornerRadius,
      this.radius
    );
    ctx.lineTo(-this.radius + this.cornerRadius, this.radius);
    ctx.quadraticCurveTo(
      -this.radius,
      this.radius,
      -this.radius,
      this.radius - this.cornerRadius
    );
    ctx.lineTo(-this.radius, -this.radius + this.cornerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawBlank(ctx: any) {
    ctx.beginPath();
    ctx.moveTo(
      this.pos.x - this.radius,
      this.pos.y - this.radius + this.cornerRadius
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.radius,
      this.pos.y - this.radius,
      this.pos.x - this.radius + this.cornerRadius,
      this.pos.y - this.radius
    );
    ctx.moveTo(
      this.pos.x + this.radius - this.cornerRadius,
      this.pos.y - this.radius
    );
    ctx.quadraticCurveTo(
      this.pos.x + this.radius,
      this.pos.y - this.radius,
      this.pos.x + this.radius,
      this.pos.y - this.radius + this.cornerRadius
    );
    ctx.moveTo(
      this.pos.x + this.radius,
      this.pos.y + this.radius - this.cornerRadius
    );
    ctx.quadraticCurveTo(
      this.pos.x + this.radius,
      this.pos.y + this.radius,
      this.pos.x + this.radius - this.cornerRadius,
      this.pos.y + this.radius
    );
    ctx.moveTo(
      this.pos.x - this.radius + this.cornerRadius,
      this.pos.y + this.radius
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.radius,
      this.pos.y + this.radius,
      this.pos.x - this.radius,
      this.pos.y + this.radius - this.cornerRadius
    );
    ctx.moveTo(
      this.pos.x - this.radius,
      this.pos.y - this.radius + this.cornerRadius
    );
    ctx.closePath();
    ctx.fill();
  }
}
