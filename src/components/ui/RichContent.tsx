"use client";
import { i18nText } from "@/lib/i18nText";

import { useEffect, useRef } from "react";

interface RichContentProps {
  data?: string | null;
  className?: string;
}

export default function RichContent({ data, className = "" }: RichContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.querySelectorAll("table").forEach((table) => {
      if (table.parentElement?.classList.contains("rich-table-scroll")) {
        return;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "rich-table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", i18nText("AUTO.components.ui.richcontent.extra26_0_bang_noi_dung"));

      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }, [data]);

  return (
    <div
      ref={contentRef}
      className={`rich-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: data || "" }}
    />
  );
}
