import style from "./SixteenTesting.module.scss";
import html2canvas from "html2canvas";
import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  i: number;
}
function toBinary(number: any) {
  const temp = number.toString(2);
  const addOn = "0".repeat(4 - temp.length);
  return addOn + temp;
}

function SixteenTesting() {
  const [current, setCurrent] = useState(0);
  const [canvas, setCanvas] = useState<any>(null!);
  useEffect(() => {
    setCanvas(new App());
  }, []);

  const containerRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (containerRef && canvas && current < 16) {
        canvas.draw(current);
        await html2canvas(containerRef.current).then((canvas) => {
          const url = canvas.toDataURL();
          let link = document.createElement("a");
          document.body.appendChild(link);
          link.href = url;
          link.download = `Shapes_${toBinary(current)}.png`;
          link.click();
          document.body.removeChild(link);
        });
        setCurrent((v) => v + 1);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [containerRef, current, canvas]);

  return (
    <div
      className={style.container}
      ref={containerRef}
      id="CanvasWrapper"
    ></div>
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  current: any;
  dec2: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.stageWidth = 800;
    this.stageHeight = 800;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
  }

  draw(current: any) {
    this.current = current;
    this.dec2 = toBinary(current);

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = this.dec2[0] === "0" ? "white" : "black";
    this.ctx.fillRect(0, 0, this.stageWidth / 2, this.stageHeight / 2);

    this.ctx.fillStyle = this.dec2[1] === "0" ? "white" : "black";
    this.ctx.fillRect(
      this.stageWidth / 2,
      0,
      this.stageWidth / 2,
      this.stageHeight / 2
    );

    this.ctx.fillStyle = this.dec2[2] === "0" ? "white" : "black";
    this.ctx.fillRect(
      0,
      this.stageHeight / 2,
      this.stageWidth / 2,
      this.stageHeight / 2
    );

    this.ctx.fillStyle = this.dec2[3] === "0" ? "white" : "black";
    this.ctx.fillRect(
      this.stageWidth / 2,
      this.stageHeight / 2,
      this.stageWidth / 2,
      this.stageHeight / 2
    );
  }
}

export default SixteenTesting;
