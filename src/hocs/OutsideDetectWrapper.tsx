import { PropsWithChildren, useEffect, useRef } from "react";
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, callback: Function) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        callback && callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideDetectWrapper({
  callback,
  children,
}: PropsWithChildren<{ callback: Function }>) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, callback);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideDetectWrapper;
