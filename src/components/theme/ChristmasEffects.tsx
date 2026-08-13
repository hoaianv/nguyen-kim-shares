"use client";

import { useEffect, useState } from "react";
import { useStateStore } from "@/stores/stateStore";

export default function ChristmasEffects() {
  const theme = useStateStore((state) => state.theme);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!theme || theme.key !== "christmas" || !theme.effects.snow.enabled) {
      setEnabled(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setEnabled(
        !reduceMotion.matches &&
          !(theme.effects.snow.disableMobile && mobile.matches),
      );
    };

    update();
    reduceMotion.addEventListener("change", update);
    mobile.addEventListener("change", update);

    return () => {
      reduceMotion.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, [theme]);

  if (!enabled) return null;

  return (
    <div
      className="christmas-effects pointer-events-none fixed inset-0 z-[45] overflow-hidden"
      aria-hidden="true"
    >
      <span className="christmas-snow christmas-snow--one" />
      <span className="christmas-snow christmas-snow--two" />
      <span className="christmas-snow christmas-snow--three" />
    </div>
  );
}
