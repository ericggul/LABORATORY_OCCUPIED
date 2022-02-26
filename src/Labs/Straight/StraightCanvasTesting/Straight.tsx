import style from "./Straight.module.scss";
import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import html2canvas from "html2canvas";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const getColor = () => {
  const randomColorArray = [
    `hsl(${getRandom(200, 220)}, ${getRandom(30, 90)}%, ${getRandom(30, 70)}%)`,
    `hsl(${getRandom(210, 250)}, ${getRandom(50, 80)}%, ${getRandom(10, 50)}%)`,
    `hsl(230, ${getRandom(30, 100)}%, ${getRandom(10, 90)}%)`,
  ];
  return randomColorArray[Math.floor(Math.random() * randomColorArray.length)];
};

export default function StraightTest() {
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

  return <div className={style.container} id="CanvasWrapper" />;
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  scale: any;

  lineArray: any;
  lineNumber: any;

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

    this.scale = 3;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.lineNumber = Math.floor((this.stageWidth * this.stageHeight) / 30);
    this.lineArray = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.lineNumber; i++) {
      this.lineArray.push(
        new Line(
          getRandom(
            Math.min(this.stageWidth, this.stageHeight),
            Math.max(this.stageWidth, this.stageHeight)
          ),
          getColor()
        )
      );
    }
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.lineWidth = "0.5px";
    this.lineArray.forEach((line: any) =>
      line.draw(this.ctx, this.stageWidth, this.stageHeight)
    );
  }

  capture() {
    console.log("handling..");
    let dataURL = this.canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "straight.png";
    link.href = dataURL;

    link.click();
    console.log("downloaded..");
    link.remove();
  }
}

class Line {
  height: any;
  color: any;
  angle: any;

  constructor(height: any, color: any) {
    this.height = height;
    this.color = color;
    this.angle = getRandom(0, Math.PI * 2);
  }

  draw(ctx: any, stageWidth: any, stageHeight: any) {
    let start = { x: getRandom(0, stageWidth), y: getRandom(0, stageHeight) };
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(
      start.x + this.height * Math.cos(this.angle),
      start.y + this.height * Math.sin(this.angle)
    );
    ctx.stroke();
  }
}
