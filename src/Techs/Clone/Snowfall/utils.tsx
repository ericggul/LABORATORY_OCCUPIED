export function random(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min + 1) + min;

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    return randomNumber;
  } else {
    return Math.floor(randomNumber);
  }
}

export function lerp(start: number, end: number, normal: number): number {
  return start + (end - start) * normal;
}

export function getSize(element?: HTMLElement) {
  if (!element) return { height: 0, width: 0 };

  return {
    height: element.offsetHeight,
    width: element.offsetWidth,
  };
}
