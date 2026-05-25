import { useEffect, useState } from "react";

const useDebouncer = (text: string, delay: number) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, delay]);

  return debouncedText;
};

export default useDebouncer;
