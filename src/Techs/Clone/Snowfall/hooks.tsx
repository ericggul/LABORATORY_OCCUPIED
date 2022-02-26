import {
  DependencyList,
  EffectCallback,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  CSSProperties,
  useMemo,
} from "react";
import isEqual from "react-fast-compare";
import Snowflake, { SnowflakeConfig } from "./Snowflake";
import { snowfallBaseStyle } from "./config";
import { getSize } from "./utils";

const createSnowflakes = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>,
  amount: number,
  config: SnowflakeConfig
) => {
  const snowflakes: Snowflake[] = [];

  for (let i = 0; i < amount; i++) {
    snowflakes.push(
      new Snowflake(canvasRef.current as HTMLCanvasElement, config)
    );
  }

  return snowflakes;
};

export const useSnowflakes = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>,
  amount: number,
  config: SnowflakeConfig
) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    setSnowflakes((sfl) => {
      const difference = amount - sfl.length;
      if (difference > 0) {
        return [...sfl, ...createSnowflakes(canvasRef, difference, config)];
      } else if (difference < 0) {
        return sfl.slice(0, amount);
      }
      return sfl;
    });
  }, [amount, canvasRef, config]);

  useEffect(() => {
    setSnowflakes((sfls) =>
      sfls.map((sfl) => {
        sfl.config = config;
        return sfl;
      })
    );
  }, [config]);

  return snowflakes;
};

export const useComponentSize = (
  ref: MutableRefObject<HTMLElement | undefined>
) => {
  const [size, setSize] = useState(getSize(ref.current));

  const resizeHandler = useCallback(() => {
    if (ref.current) {
      setSize(getSize(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;
    if (!ref.current) return;
    resizeHandler();

    if (typeof ResizeObserver === "function") {
      const resizeObserver = new ResizeObserver(resizeHandler);
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    } else {
      window.addEventListener("resize", resizeHandler);
      return () => window.removeEventListener("reszie", resizeHandler);
    }
  }, [ref, resizeHandler]);

  return size;
};

export const useSnowfallStyle = (overrides?: CSSProperties) => {
  const styles = useMemo(
    () => ({
      ...snowfallBaseStyle,
      ...(overrides || {}),
    }),
    [overrides]
  );

  return styles;
};

export function useDeepCompareEffect(
  effect: EffectCallback,
  deps: DependencyList
) {
  const ref = useRef<DependencyList>(deps);
  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  useEffect(effect, ref.current);
}

export function useDeepMemo<T>(value: T): T {
  const [state, setState] = useState(value);
  useDeepCompareEffect(() => setState(value), [value]);
  return state;
}
