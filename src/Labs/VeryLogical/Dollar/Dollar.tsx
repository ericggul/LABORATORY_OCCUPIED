import style from "./Dollar.module.scss";
import html2canvas from "html2canvas";
import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  i: number;
}

function Dollar() {
  const [val, setVal] = useState(1);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (containerRef) {
        await html2canvas(containerRef.current).then((canvas) => {
          const url = canvas.toDataURL();
          let link = document.createElement("a");
          document.body.appendChild(link);
          link.href = url;
          link.download = `$${val}.png`;
          link.click();
          document.body.removeChild(link);
        });
        setVal((v) => v + 1);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [containerRef, val]);

  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.number}>{`$${val}`}</div>
    </div>
  );
}

export default Dollar;
