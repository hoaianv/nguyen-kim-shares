import { christmasTheme } from "@/theme/christmasTheme.config";
import { defaultTheme } from "@/theme/defaultTheme.config";
import type { ThemeConfig, ThemeKey } from "@/theme/types";

export const THEME_PREVIEW_COOKIE = "nk_theme_preview";
export const THEME_QUERY_PARAM = "theme";

export const themeRegistry: Record<ThemeKey, ThemeConfig> = {
  default: defaultTheme,
  christmas: christmasTheme,
};

export const DEFAULT_THEME_KEY: ThemeKey = "default";

export function isThemeKey(value: string | undefined | null): value is ThemeKey {
  return Boolean(value && value in themeRegistry);
}

export function getThemeByKey(value: string | undefined | null): ThemeConfig {
  if (isThemeKey(value)) {
    return themeRegistry[value];
  }

  return themeRegistry[DEFAULT_THEME_KEY];
}

export function isThemeActive(theme: ThemeConfig, now = new Date()): boolean {
  if (theme.status === "disabled") return false;

  const from = theme.effectiveFrom ? new Date(theme.effectiveFrom) : null;
  const to = theme.effectiveTo ? new Date(theme.effectiveTo) : null;

  if (from && Number.isFinite(from.getTime()) && now < from) return false;
  if (to && Number.isFinite(to.getTime()) && now > to) return false;

  return true;
}
