export function debounce(func: any, timeout = 500) {
  let timer: any;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => func(...args), timeout);
  };
}

export function throttle(func: any, timeout = 500) {
  let waiting = false;
  return (...args: any) => {
    if (!waiting) {
      func(...args);
      waiting = true;
      window.setTimeout(() => {
        waiting = false;
      }, timeout);
    }
  };
}
