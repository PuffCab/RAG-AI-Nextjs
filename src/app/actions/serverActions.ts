"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";

const checkIfMobile = () => {
  const { device } = userAgent({ headers: headers() });
  const isMobile = device?.type === "mobile" ? true : false;
  console.log("isMobile :>> ", isMobile);

  return isMobile;
};

export { checkIfMobile };
