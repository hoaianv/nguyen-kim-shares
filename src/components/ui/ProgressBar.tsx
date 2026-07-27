"use client";

import { Next13ProgressBar } from "next13-progressbar";

export default function ProgressBar() {
  return (
    <Next13ProgressBar
      height="3px"
      color="#F4B43F"
      options={{ showSpinner: true }}
      showOnShallow
    />
  );
}
