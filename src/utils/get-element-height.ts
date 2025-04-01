import { useSignal } from "@preact/signals-react";
import { useEffect, useRef } from "react";

const useElementHeights = () => {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const heights = useSignal<number[]>([]);

  const updateHeights = () => {
    const newHeights = refs.current.map((ref) =>
      ref ? ref.getBoundingClientRect().height : 0
    );

    // Đảm bảo rằng heights không chứa giá trị NaN
    const sanitizedHeights = newHeights.map((height) =>
      isNaN(height) ? 0 : height
    );
    heights.value = sanitizedHeights;
  };

  useEffect(() => {
    updateHeights();

    window.addEventListener("resize", updateHeights);
    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  return { refs, heights };
};

export default useElementHeights;
