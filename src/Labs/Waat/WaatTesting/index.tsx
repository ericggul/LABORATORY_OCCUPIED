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

  layers: any;
  layersNumber: any;

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

    this.layers = [];
    this.layersNumber = 100;
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
    for (let i = 0; i < this.layersNumber; i++) {
      const randomBlue = getRandom(70, 250);
      const randomGreen = 180;
      this.layers.push(
        new Layer(
          500,
          { min: 20 - i * 0.2, max: 50 - i * 0.5 },
          {
            x: {
              min: this.stageWidth * (i * 0.005),
              max: this.stageWidth * (1 - i * 0.005),
            },
            y: {
              min: this.stageHeight * (i * 0.005),
              max: this.stageHeight * (1 - i * 0.005),
            },
          },
          { min: Math.PI * 2, max: Math.PI * 2 },
          { min: 0.01, max: 0.03 },
          {
            r: { min: 0 + i * 2, max: 50 + i * 2 },
            g: { min: randomGreen - i * 1, max: randomGreen + 50 - i * 1 },
            b: { min: randomBlue, max: randomBlue },
          }
        )
      );
    }

    this.draw();
  }

  draw() {
    this.layers.map((layer: any) => layer.draw(this.ctx));
  }
}

class Layer {
  circles: any;
  layerPos: any;
  layerNumber: any;
  layerRadius: any;
  angle: any;
  layerOpacity: any;
  layerColor: any;
  constructor(
    layerNumber: any,
    layerRadius: any,
    layerPos: any,
    angle: any,
    layerOpacity: any,
    layerColor: any
  ) {
    this.layerNumber = layerNumber;
    this.layerRadius = layerRadius;
    this.layerPos = layerPos;
    this.angle = angle;
    this.layerOpacity = layerOpacity;
    this.layerColor = layerColor;

    this.circles = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.layerNumber; i++) {
      this.circles.push(
        new Circle(
          getRandom(this.layerPos.x.min, this.layerPos.x.max),
          getRandom(this.layerPos.y.min, this.layerPos.y.max),
          getRandom(this.layerRadius.min, this.layerRadius.max),
          getRandom(this.angle.min, this.angle.max),
          getRandom(this.layerOpacity.min, this.layerOpacity.max),
          this.layerColor
        )
      );
    }
  }

  draw(ctx: any) {
    this.circles.forEach((circle: any) => circle.draw(ctx));
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
