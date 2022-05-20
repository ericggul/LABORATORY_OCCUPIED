import { useEffect, useState } from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function Waat() {
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

  return (
    <S.Container>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        id="CanvasWrapper"
      />
    </S.Container>
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  layerOne: any;
  layerOneNumber: any;

  layerTwo: any;
  layerTwoNumber: any;

  layerThree: any;
  layerThreeNumber: any;

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

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.layerOne = [];
    this.layerTwo = [];
    this.layerThree = [];

    this.init();
  }

  capture() {
    console.log("handling..");
    let dataURL = this.canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "shitga.png";
    link.href = dataURL;

    link.click();
    console.log("downloaded..");
    link.remove();
  }

  init() {
    this.layerOneNumber = 1000;

    for (let i = 0; i < this.layerOneNumber; i++) {
      this.layerOne.push(
        new Circle(
          getRandom(0, this.stageWidth),
          getRandom(0, this.stageHeight),
          getRandom(20, 50),
          getRandom(Math.PI * 2, Math.PI * 2),
          0.1,
          {
            r: { min: 150, max: 200 },
            g: { min: 200, max: 250 },
            b: { min: 150, max: 200 },
          }
        )
      );
    }
    this.layerTwoNumber = 250;

    for (let i = 0; i < this.layerTwoNumber; i++) {
      this.layerTwo.push(
        new Circle(
          getRandom(this.stageWidth * 0.2, this.stageWidth * 0.8),
          getRandom(this.stageHeight * 0.2, this.stageHeight * 0.8),
          getRandom(30, 100),
          getRandom(Math.PI * 2, Math.PI * 2),
          0.1,
          {
            r: { min: 250, max: 250 },
            g: { min: 150, max: 150 },
            b: { min: 150, max: 200 },
          }
        )
      );
    }
    this.layerThreeNumber = 3000;
    for (let i = 0; i < this.layerThreeNumber; i++) {
      this.layerThree.push(
        new Circle(
          getRandom(0, this.stageWidth),
          getRandom(0, this.stageHeight),
          getRandom(40, 70),
          getRandom(Math.PI * 2, Math.PI * 2),
          0.01,
          {
            r: { min: 200, max: 200 },
            g: { min: 200, max: 250 },
            b: { min: 150, max: 250 },
          }
        )
      );
    }

    this.draw();
  }

  draw() {
    this.layerOne.map((circle: any) => circle.draw(this.ctx));
    this.layerTwo.map((circle: any) => circle.draw(this.ctx));
    this.layerThree.map((circle: any) => circle.draw(this.ctx));
  }
}

class Circle {
  x: any;
  y: any;
  radius: any;
  angle: any;

  opacity: any;
  colorRange: any;

  constructor(
    x: any,
    y: any,
    radius: any,
    angle: any,
    opacity: any,
    colorRange: any
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.opacity = opacity;
    this.colorRange = colorRange;
  }

  draw(ctx: any) {
    ctx.fillStyle = `rgba(${getRandom(
      this.colorRange.r.min,
      this.colorRange.r.max
    )}, 
    ${getRandom(this.colorRange.g.min, this.colorRange.g.max)}, ${getRandom(
      this.colorRange.b.min,
      this.colorRange.b.max
    )}, ${this.opacity})`;

    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, 0, this.angle, false);

    ctx.fill();
    ctx.closePath();
  }
}
