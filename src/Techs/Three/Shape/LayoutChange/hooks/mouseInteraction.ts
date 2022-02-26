import { useRef } from "react";

export const useMousePointInteraction = ({
  data,
  selectedPoint,
  onPointSelect,
}: any) => {
  const mouseDownRef = useRef([0, 0]);
  const handlePointerDown = (e: any) => {
    mouseDownRef.current[0] = e.clientX;
    mouseDownRef.current[1] = e.clietnY;
  };

  const handleClick = (e: any) => {
    const { instanceId, clientX, clientY } = e;
    const downDistance = Math.sqrt(
      Math.pow(mouseDownRef.current[0] - clientX, 2) +
        Math.pow(mouseDownRef.current[1] - clientY, 2)
    );

    if (downDistance > 5) {
      e.stopPropagation();
      return;
    }

    if (data[instanceId] === selectedPoint) {
      onPointSelect(null);
    } else {
      onPointSelect(data[instanceId]);
    }
  };
  return { handlePointerDown, handleClick };
};
