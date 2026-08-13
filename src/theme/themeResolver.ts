import {
  DEFAULT_THEME_KEY,
  getThemeByKey,
  isThemeActive,
  THEME_PREVIEW_COOKIE,
} from "@/theme/themeRegistry";
import type { ThemeConfig } from "@/theme/types";

type ThemeCookieStore = {
  get: (name: string) => { value?: string } | undefined;
};

export function resolveThemeFromCookies(
  cookieStore: ThemeCookieStore,
  now = new Date(),
): ThemeConfig {
  const previewThemeKey = cookieStore.get(THEME_PREVIEW_COOKIE)?.value;
  const previewTheme = getThemeByKey(previewThemeKey);

  if (previewTheme.key !== DEFAULT_THEME_KEY && isThemeActive(previewTheme, now)) {
    return previewTheme;
  }

  return getThemeByKey(DEFAULT_THEME_KEY);
}
