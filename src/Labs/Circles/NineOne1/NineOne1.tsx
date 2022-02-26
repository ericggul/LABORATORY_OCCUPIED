import style from "./NineOne1.module.scss";
import { useEffect, useState, useCallback } from "react";

interface Props {
  i: number;
  globalWidth: number;
}

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;


function NineOne(){
  useEffect(()=>{
    const app = new App();
  }, []);
  return(
    <div className={style.container} id="CanvasWrapper">

    </div>
  )
}

class App {
  canvas: any;
  ctx: any;
  wrapper: any;

  stageWidth: any;
  stageHeight: any;

  circleNumber: any;
  circleArray: any;

  mousePos: any;
  mouseVel: any;

  constructor(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize(){
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);
    this.init();
  }

  init(){
    
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.circleNumber = 9;
    this.circleArray = [];
    for(let i=0; i<this.circleNumber; i++){
      this.circleArray.push(new Circle(this.ctx, this.stageWidth, this.stageHeight));
    }

    this.mousePos= {x: 0, y: 0};
    this.mouseVel= {x: 0, y: 0};
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.draw();
  }

  onMouseMove(event: any){
    this.mouseVel = {x: event.clientX - this.mousePos.x, y: event.clientY - this.mousePos.y};
    this.mousePos = {x: event.clientX, y: event.clientY};
  }

  draw(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    for(let i=0; i<this.circleNumber; i++){
      this.circleArray[i].posCoord(this.mousePos, this.mouseVel);
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

class Circle {
  radius: any;
  xPos: any;
  yPos: any;
  color: any;

  ctx: any;
  stageWidth: any;
  stageHeight: any;

  accConstant: any;

  pos: any;


  constructor(ctx: any, stageWidth: any, stageHeight: any){
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.init();
  }

  init(){
    this.accConstant = {vx: getRandom(-0.3, 0.3), vy: getRandom(-0.3, 0.3)};
    this.radius = getRandom(Math.min(this.stageWidth, this.stageHeight)/12, Math.min(this.stageWidth, this.stageHeight)/8);
    this.pos = {x: this.stageWidth/2, y: this.stageHeight/2};
  }

  posCoord(mousePos: any, mouseVel: any){
    const tempPos = {x: this.pos.x + mouseVel.x * this.accConstant.vx + mouseVel.y * getRandom(-0.4, 0.4),
                      y: this.pos.y + mouseVel.y * this.accConstant.vy + Math.sin(mousePos.x)};    
                       
    this.pos = tempPos;

  
    this.draw();
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${getRandom(30, 100)}, ${getRandom(30, 50)}%, ${getRandom(30, 50)}%, 0.3)`;
    this.ctx.fill();
  }
}

export default NineOne;
