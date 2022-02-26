import style from "./Area.module.scss";
import { useCallback, useState, useEffect } from "react";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function Area() {
  useEffect(() => {
    const draw = new App();
  }, []);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "black" }}
    />
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  divider: any;
  actualDivider: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    this.canvas.addEventListener("click", (e: any) => {
      this.divider.x = e.clientX;
      this.divider.y = e.clientY;
    });

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.divider = { x: this.stageWidth * 0.4, y: this.stageHeight * 0.6 };
    this.actualDivider = { x: 0, y: 0 };

    this.ctx.scale(1, 1);

    window.requestAnimationFrame(this.draw.bind(this));
  }

  draw() {
    window.requestAnimationFrame(this.draw.bind(this));

    this.actualDivider.x += (this.divider.x - this.actualDivider.x) * 0.1;
    this.actualDivider.y += (this.divider.y - this.actualDivider.y) * 0.1;

    console.log(this.actualDivider);

    this.drawL(this.actualDivider);
    this.drawR(this.actualDivider);
    this.drawB(this.actualDivider);
    this.drawLine(this.actualDivider);
  }

  drawL(divider: any) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(divider.x, 0);
    this.ctx.lineTo(divider.x, divider.y);
    this.ctx.lineTo(0, this.stageHeight);
    this.ctx.lineTo(0, 0);
    this.ctx.closePath();
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
  }

  drawR(divider: any) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.stageWidth, 0);
    this.ctx.lineTo(divider.x, 0);
    this.ctx.lineTo(divider.x, divider.y);
    this.ctx.lineTo(this.stageWidth, this.stageHeight);
    this.ctx.lineTo(this.stageWidth, 0);
    this.ctx.closePath();
    this.ctx.fillStyle = "pink";
    this.ctx.fill();
  }

  drawB(divider: any) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.stageHeight);
    this.ctx.lineTo(divider.x, divider.y);
    this.ctx.lineTo(this.stageWidth, this.stageHeight);
    this.ctx.lineTo(0, this.stageHeight);
    this.ctx.closePath();
    this.ctx.fillStyle = "red";
    this.ctx.fill();
  }

  drawLine(divider: any) {
    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    this.ctx.moveTo(divider.x, 0);
    this.ctx.lineTo(divider.x, divider.y);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(divider.x, divider.y);
    this.ctx.lineTo(0, this.stageHeight);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(divider.x, divider.y);
    this.ctx.lineTo(this.stageWidth, this.stageHeight);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}

class Surface {
  constructor() {}
}
