"use client";

import { useEffect, useState } from "react";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  const checkWindowSize = () => {
    let windowWidth;
    //in case it renderes on the server where window is not accesible
    console.log("windowWidth :>> ", windowWidth);
    if (typeof window !== "undefined") {
      windowWidth = window.innerWidth;
    }

    if (windowWidth >= 1024) {
      setIsDesktop(true);
    }

    if (windowWidth < 1024) {
      setIsDesktop(false);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return isDesktop;
}

export default useIsDesktop;
