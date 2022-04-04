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
  iconRows: any;
  iconCols: any;
  iconNumber: any;

  iconSets: any;
  iconInterval: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));

    // document.addEventListener("mousemove", (e) =>
    //   this.draw(e.clientX, e.clientY)
    // );
    // document.addEventListener("touchmove", (e) =>
    //   this.draw(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    // );
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.scale = 1;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.iconInterval = 30;
    this.iconRows = this.iconCols = Math.ceil(
      this.stageHeight / this.iconInterval
    );
    this.iconNumber = this.iconRows * this.iconCols;
    this.iconSets = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.iconRows; i++) {
      for (let j = 0; j < this.iconCols; j++) {
        this.iconSets.push(
          new Icon(
            {
              x:
                this.stageWidth / 2 +
                j * this.iconInterval -
                (this.iconCols * this.iconInterval) / 2,
              y:
                this.stageHeight / 2 +
                i * this.iconInterval -
                (this.iconRows * this.iconInterval) / 2,
            },
            {
              i,
              j,
            }
          )
        );
      }
    }
    this.draw(0, 0);
  }

  draw(x: any, y: any) {
    this.iconSets.map((icon: any) => icon.draw(this.ctx));
    // this.iconSets.map((icon: any) => icon.draw(this.ctx, { x, y }));
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

class Icon {
  pos: any;
  idx: any;
  angle: any;
  color: any;
  scale: any;
  constructor(pos: any, idx: any) {
    this.pos = pos;
    this.idx = idx;
    this.angle = 0;
    this.scale = 1.3;
    this.color = `rgba(${getRandom(200, 250)}, ${getRandom(0, 200)}, 0, 0.3)`;
  }

  draw(ctx: any) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.scale(this.scale, this.scale);
    ctx.fillStyle = ctx.strokeStyle = this.color;

    let p = new Path2D(PATH);
    if ((this.idx.i + this.idx.j) % 2 === 0) {
      ctx.fill(p);
    } else {
      ctx.stroke(p);
    }

    ctx.restore();
  }
}

export default IconsCanvasTesting;
