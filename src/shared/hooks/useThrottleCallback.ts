import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottleCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      const invoke = () => {
        lastCall.current = Date.now();
        callback(...args);
      };

      if (now - lastCall.current >= delay) {
        invoke();
      } else {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        const remaining = delay - (now - lastCall.current);
        timeout.current = setTimeout(invoke, remaining);
      }
    },
    [callback, delay]
  );

  return throttled;
}
