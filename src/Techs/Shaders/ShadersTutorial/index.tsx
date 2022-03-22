import * as S from "./style";
import { useEffect, useRef } from "react";
import GlslCanvas from "glslCanvas";

interface ShaderCanvasProps {
  frag: string;
  setUniforms?: { [key: string]: string };
}
function Shaders(props: ShaderCanvasProps) {
  const containerRef = useRef<any>(!null);
  const canvasRef = useRef<any>(!null);

  const resizer = () => {
    if (containerRef && canvasRef) {
      let container = containerRef.current;
      let canvas = canvasRef.current;
      if (
        container.clientWidth !== canvas.clientWidth &&
        container.clientHeight !== canvas.clientHeight
      ) {
        canvasRef.current.width = container.clientWidth;
        canvasRef.current.height = container.clientHeight;
        canvasRef.current.style.width = container.clientWidth + "px";
        canvasRef.current.style.height = container.clientHeight + "px";
      }
    }
  };

  useEffect(() => {
    if (canvasRef) {
      const sandbox = new GlslCanvas(canvasRef.current);
      for (let k in props.setUniforms) {
        sandbox.setUniform(k, props.setUniforms[k]);
      }
      resizer();
      sandbox.load(props.frag);
    }

    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  }, [canvasRef, props]);

  return (
    <S.Container ref={containerRef}>
      <canvas ref={canvasRef} />
    </S.Container>
  );
}

export default function ShadersTutorial() {
  return <S.Container />;
}
