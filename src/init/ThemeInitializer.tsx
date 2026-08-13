"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getThemeCssVariables } from "@/theme/themeCssVariables";
import {
  getThemeByKey,
  isThemeActive,
  THEME_PREVIEW_COOKIE,
  THEME_QUERY_PARAM,
} from "@/theme/themeRegistry";
import type { ThemeConfig } from "@/theme/types";
import { useStateStore } from "@/stores/stateStore";

function applyThemeToBody(theme: ThemeConfig) {
  document.body.dataset.theme = theme.key;
  const variables = getThemeCssVariables(theme);

  Object.entries(variables).forEach(([key, value]) => {
    document.body.style.setProperty(key, String(value));
  });
}

function persistPreviewTheme(theme: ThemeConfig) {
  document.cookie = `${THEME_PREVIEW_COOKIE}=${theme.key}; path=/; max-age=2592000; samesite=lax`;
}

export function ThemeInitializer({ theme }: { theme: ThemeConfig }) {
  const setTheme = useStateStore((state) => state.setTheme);
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryTheme = searchParams.get(THEME_QUERY_PARAM);
    const nextTheme = queryTheme ? getThemeByKey(queryTheme) : theme;
    const resolvedTheme = isThemeActive(nextTheme) ? nextTheme : getThemeByKey("default");

    setTheme(resolvedTheme);
    applyThemeToBody(resolvedTheme);

    if (queryTheme) {
      persistPreviewTheme(resolvedTheme);
    }
  }, [searchParams, setTheme, theme]);

  return null;
}
