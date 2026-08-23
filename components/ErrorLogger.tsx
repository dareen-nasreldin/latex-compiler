"use client";

import { useEffect } from "react";

// Mounted once at the root. If something breaks before our own component
// logs would fire — a hydration error, a thrown exception during module
// init — this is the net that still catches it in the console.
export default function ErrorLogger() {
  useEffect(() => {
    console.log("[ErrorLogger] app mounted and hydrated");

    const onError = (e: ErrorEvent) => {
      console.error("[window error]", e.message, e.error);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      console.error("[unhandled rejection]", e.reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
