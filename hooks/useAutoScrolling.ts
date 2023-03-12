import { useEffect } from "react";
import { breakPoints } from "@yosefbeder/design-system/constants";

const useAutoScrolling = (mainRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const main = mainRef.current!;
    const viewPortWidth = window.innerWidth;

    if (viewPortWidth >= breakPoints.sm) {
      main.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
  }, []);
};

export default useAutoScrolling;
