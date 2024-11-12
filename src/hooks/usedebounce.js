import { useCallback, useEffect } from "react";

function useDebounce(callback, delay) {
  let timeout;

  const debouncedFunction = useCallback(
    (...args) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup the timeout when the component unmounts
  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return debouncedFunction;
}
export default useDebounce;
