import style from "./Smudge.module.scss";
import { useState, useEffect } from "react";

import Water from "../../assets/Water.jpg";
import Grass from "../../assets/Grass.jpg";
import { runInThisContext } from "vm";

function Smudge() {
  const [brushed, setBrushed] = useState(0);
  const [next, setNext] = useState(false);
  const getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  useEffect(() => {
    const smudge = new App();

    const handleMouseMove = (ev: any) => {
      if (smudge.defectLeftButton(ev)) {
        smudge.drawDot(ev.clientX, ev.clientY);
        setBrushed((brushed) => brushed + 1);
      }
    };

    const handleTouchMove = (ev: any) => {
      var relativePos = smudge.getRelativePos(
        ev.changedTouches[0].clientX,
        ev.changedTouches[0].clientY
      );
      smudge.drawDot(relativePos.x, relativePos.y);
      setBrushed((brushed) => brushed + 1);
    };

    if (next) {
      smudge.clearImage();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [next]);

  useEffect(() => {
    console.log(brushed);
    if (brushed > 400) {
      setNext(true);
    }
  }, [brushed]);

  return (
    <div
      className={style.wrapper}
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;
  particles: any;
  brushRadius: any;
  img: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    const isMobile = document.body.clientWidth < 768;
    this.resize();
  }

  getRandom = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;
    this.brushRadius = (this.stageWidth + this.stageHeight) / 40;

    this.canvas.height = this.stageHeight;
    this.canvas.width = this.stageWidth;

    this.ctx.scale(1, 1);
    this.drawImage();
  }

  drawImage() {
    this.img = new Image();
    this.img.onload = () => {
      this.ctx.drawImage(this.img, 0, 0, this.stageWidth, this.stageHeight);
    };
    this.img.src = Water;
  }

  clearImage() {
    console.log("fired");
    this.ctx.clearRect(0, 0, this.stageHeight, this.stageHeight);
  }

  defectLeftButton(event: any) {
    if ("buttons" in event) {
      return event.buttons === 1;
    } else if ("which" in event) {
      return event.which === 1;
    } else {
      return event.button === 1;
    }
  }

  getRelativePos(givenX: any, givenY: any) {
    var canvasRect = this.canvas.getBoundingClientRect();
    return {
      x: Math.floor(
        ((givenX - canvasRect.left) / (canvasRect.right - canvasRect.left)) *
          canvasRect.width
      ),
      y: Math.floor(
        ((givenY - canvasRect.top) / (canvasRect.bottom - canvasRect.top)) *
          canvasRect.height
      ),
    };
  }

  drawDot(mouseX: any, mouseY: any) {
    this.ctx.beginPath();
    this.ctx.arc(
      mouseX,
      mouseY,
      this.getRandom(this.brushRadius, this.brushRadius * 1.5),
      0,
      2 * Math.PI,
      true
    );
    this.ctx.fillStyle = "#000";
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.fill();
  }
}

export default Smudge;
