import style from "./Building.module.scss";
import useResize from "../../hooks/useResize";
import useMousePosition from "../../hooks/useMousePosition";
import useTouchPosition from "../../hooks/useTouchPosition";
import { useState, useCallback, useEffect } from "react";

interface Props {
  i: number;
}

function Building() {
  const getRandom = useCallback((a: number, b: number) => {
    return Math.random() * (b - a) + a;
  }, []);

  const [width, height] = useResize();
  const { mouseX, mouseY } = useMousePosition();
  const { touchX, touchY } = useTouchPosition();

  const TARGET_POS = { x: 0.3, y: 0.4 };
  const AREA = { x: 0.05, y: 0.05 };

  const [color, setColor] = useState({ r: 247, g: 246, b: 236 });

  useEffect(() => {
    if (
      mouseX / width > TARGET_POS.x - AREA.x &&
      mouseX / width < TARGET_POS.x + AREA.x &&
      mouseY / height > TARGET_POS.y - AREA.y &&
      mouseY / height < TARGET_POS.y + AREA.y
    ) {
      setColor({ r: 35, g: 46, b: 35 });
    } else if (
      touchX / width > TARGET_POS.x - AREA.x &&
      touchX / width < TARGET_POS.x + AREA.x &&
      touchY / height > TARGET_POS.y - AREA.y &&
      touchY / height < TARGET_POS.y + AREA.y
    ) {
      setColor({ r: 35, g: 46, b: 35 });
    } else {
      setColor({ r: 247, g: 246, b: 236 });
    }
  }, [mouseX, mouseY, touchX, touchY, width, height, color]);

  return (
    <div className={style.container}>
      <div
        className={style.square}
        style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
      />
    </div>
  );
}

export default Building;
