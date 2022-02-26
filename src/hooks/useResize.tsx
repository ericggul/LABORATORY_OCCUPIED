import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "../functions/timer";

function useResize() {
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );
  const [windowHeight, setWindowHeight] = useState(
    document.documentElement.clientHeight > 768
      ? document.documentElement.clientHeight
      : window.innerHeight
  );

  const onResize = useCallback(() => {
    const documentClientHeight = document.documentElement.clientHeight;
    setWindowHeight(
      documentClientHeight > 768 ? documentClientHeight : window.innerHeight
    );
    const documentClientWidth = document.documentElement.clientWidth;
    setWindowWidth(documentClientWidth);
  }, []);
  const debouncedOnResize = useMemo(() => debounce(onResize, 50), [onResize]);

  useEffect(() => {
    window.addEventListener("resize", debouncedOnResize);
    debouncedOnResize();

    return () => window.removeEventListener("resize", debouncedOnResize);
  }, [debouncedOnResize]);

  return [windowWidth, windowHeight];
}
export default useResize;
