"use client";

import { useState } from "react";
import { SupportButton } from "./SupportButton";
import { SupportPopup } from "./SupportPopup";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SupportButton onClick={() => setIsOpen(true)} />
      <SupportPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
