import * as S from "./styles";
import { useState, useEffect } from "react";

export default function Lines() {
  const [draw, setDraw] = useState<any>(null);
  useEffect(() => {
    setDraw(new App());
  }, []);

  useEffect(() => {
    if (draw) {
      document.addEventListener("keydown", () => draw.capture());
      return () =>
        document.removeEventListener("keydown", () => draw.capture());
    }
  }, [draw]);

  return <S.Container id="CanvasWrapper" />;
}

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const product = (min: number, max: number) => {
  let prd = min;
  let i = min;
  while (i++ < max) {
    prd *= i;
  }
  return prd;
};
const combination = (a: number, b: number) => {
  if (a === b || b === 0) {
    return 1;
  } else {
    b = b < a - b ? a - b : b;
    return product(b + 1, a) / product(1, a - b);
  }
};

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  scale: any;

  timeInterval: any;
  now: any;
  then: any;
  initial: any;
  elapsedTime: any;

  elementNumber: any;
  elementSets: any;

  heightNumber: any;

  widthInterval: any;
  heightInterval: any;
  lineSectors: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    this.timeInterval = 10;

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.scale = 1;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.init();
  }

  init() {
    this.elementSets = [];
    this.heightNumber = 8;
    this.elementNumber = 2 ** this.heightNumber;
    for (let i = 0; i < this.elementNumber; i++) {
      this.elementSets.push({
        color: `rgb(${getRandom(0, 250)}, ${getRandom(0, 250)}, ${getRandom(
          0,
          250
        )})`,
      });
    }

    this.widthInterval = 30;
    this.heightInterval = 50;
    this.lineSectors = [];
    const yStart =
      this.stageHeight / 2 - (this.heightInterval * this.heightNumber) / 2;
    for (let i = 0; i < this.heightNumber; i++) {
      for (let j = 0; j < (i + 1) * 2; j++) {
        this.lineSectors.push(
          new LineSector(
            {
              xPos:
                this.stageWidth / 2 -
                (this.widthInterval * (i + 1)) / 2 +
                this.widthInterval * Math.floor(j / 2),
              yPos: yStart + this.heightInterval * i,
            },
            {
              xPos:
                this.stageWidth / 2 -
                (this.widthInterval * (i + 2)) / 2 +
                this.widthInterval * Math.floor((j + 1) / 2),
              yPos: yStart + this.heightInterval * (i + 1),
            },
            combination(i, Math.floor(j / 2)) *
              Math.pow(2, this.heightNumber - i)
          )
        );
      }
    }

    this.then = Date.now();
    this.initial = Date.now();
    this.draw();
  }

  capture() {
    console.log("handling..");
    let dataURL = this.canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "towards_divergence.png";
    link.href = dataURL;
    link.click();
    console.log("downloaded..");
    link.remove();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    this.elapsedTime = this.now - this.initial;
    const delta = this.now - this.then;
    this.then = this.now;
  }

  draw() {
    this.lineSectors.forEach((sect: any) => sect.draw(this.ctx));
  }
}

class LineSector {
  start: { xPos: number; yPos: number };
  end: { xPos: number; yPos: number };
  numbers: number;
  lineSets: any;
  lineInterval: number;

  constructor(start: any, end: any, numbers: number) {
    this.start = start;
    this.end = end;
    this.numbers = numbers;
    this.lineSets = [];
    this.lineInterval = 0.1;
  }

  draw(ctx: any) {
    console.log(this.start, this.end);
    for (let i = 0; i < this.numbers; i++) {
      ctx.strokeColor = "black";
      ctx.beginPath();
      ctx.moveTo(
        this.start.xPos + (-(this.numbers - 1) / 2 + i) * this.lineInterval,
        this.start.yPos
      );
      ctx.lineTo(
        this.end.xPos + (-(this.numbers - 1) / 2 + i) * this.lineInterval,
        this.end.yPos
      );
      ctx.stroke();
    }
  }
}
