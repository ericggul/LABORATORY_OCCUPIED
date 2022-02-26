import { useState, useEffect } from "react";

const useTouchPosition = () => {
  const [touchPosition, setTouchPosition] = useState({
    touchX: 0,
    touchY: 0,
  });

  const updateTouchPosition = (ev: any) => {
    setTouchPosition({
      touchX: ev.changedTouches[0].clientX,
      touchY: ev.changedTouches[0].clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("touchmove", updateTouchPosition);

    return () => window.removeEventListener("touchmove", updateTouchPosition);
  }, []);

  return touchPosition;
};

export default useTouchPosition;
