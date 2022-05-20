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

  circles: any;
  circleNumber: any;

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

    this.circleNumber = 5000;
    this.circles = [];
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
    for (let i = 0; i < this.circleNumber; i++) {
      this.circles.push(
        new Circle(
          getRandom(0, this.stageWidth),
          getRandom(0, this.stageHeight),
          getRandom(20, 100),
          getRandom(Math.PI * 2, Math.PI * 2)
        )
      );
    }

    this.draw();
  }

  draw() {
    this.circles.map((circle: any) => circle.draw(this.ctx));
  }
}

class Circle {
  x: any;
  y: any;
  radius: any;
  angle: any;

  constructor(x: any, y: any, radius: any, angle: any) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
  }

  draw(ctx: any) {
    ctx.fillStyle = `rgba(${getRandom(100, 250)}, ${getRandom(
      110,
      150
    )}, ${getRandom(100, 250)}, 0.05)`;

    ctx.beginPath();

    ctx.fillRect(
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );

    ctx.fill();
    ctx.closePath();
  }
}
