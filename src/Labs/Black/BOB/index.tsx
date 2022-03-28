import { useState, useEffect, useRef, useCallback } from "react";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function BOB() {
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
    <>
      <div
        id="CanvasWrapper"
        style={{ width: "100vw", height: "100vh", background: "black" }}
      />
    </>
  );
}

//30vh + 10px
//23vw + 10px

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  squareSets: any;
  squareNumber: any;

  restrictedArea: any;

  scale: any;

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
    this.squareNumber = 20000;
    this.squareSets = [];

    this.restrictedArea = {
      x: [this.stageWidth * 0.23, this.stageWidth * 0.23 + 10],
      y: [this.stageHeight * 0.3, this.stageHeight * 0.3 + 10],
    };

    this.init();
  }

  init() {
    for (let i = 0; i < this.squareNumber; i++) {
      this.squareSets.push(
        new Square(
          {
            x: getRandom(-this.stageWidth * 0.4, this.stageWidth * 1.2),
            y: getRandom(0, this.stageHeight * 1.2),
          },
          {
            x: getRandom(50, 100),
            y: getRandom(50, 100),
          },
          this.restrictedArea
        )
      );
    }
    this.draw();
  }

  draw() {
    this.squareSets.map((square: any, i: number) => square.draw(this.ctx));
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

class Square {
  pos: any;
  size: any;

  interval: any;
  repeat: any;
  colorArrange: any;
  restrictedArea: any;

  opacity: any;

  constructor(pos: any, size: any, restrictedArea: any) {
    this.pos = pos;
    this.size = size;

    this.repeat = Math.floor(getRandom(0, 100));
    this.interval = { x: getRandom(-5, 5), y: getRandom(-5, 5) };

    this.restrictedArea = restrictedArea;
    this.opacity = 0.05;
  }

  draw(ctx: any) {
    for (let i = 0; i < this.repeat; i++) {
      if (
        this.pos.x + this.interval.x * i + this.size.x / 2 >
          this.restrictedArea.x[0] &&
        this.pos.x + this.interval.x * i - this.size.x / 2 <
          this.restrictedArea.x[1] &&
        this.pos.y + this.interval.y * i + this.size.y / 2 >
          this.restrictedArea.y[0] &&
        this.pos.y + this.interval.y * i - this.size.y / 2 <
          this.restrictedArea.y[1]
      ) {
        return;
      } else {
        const angle = 0;
        ctx.translate(
          this.pos.x + this.interval.x * i,
          this.pos.y + this.interval.y * i
        );
        ctx.rotate(angle);
        ctx.fillStyle = `rgba(
            ${getRandom(getRandom(200, 250), 255)},
             ${getRandom(getRandom(getRandom(180, 220), 240), 255)}, 
             ${getRandom(getRandom(200, 250), 255)} ,${this.opacity})`;

        ctx.fillRect(
          -this.size.x / 2,
          -this.size.y / 2,
          this.size.x,
          this.size.y
        );
        ctx.rotate(-angle);
        ctx.translate(
          -this.pos.x - this.interval.x * i,
          -this.pos.y - this.interval.y * i
        );
      }
    }
  }
}
