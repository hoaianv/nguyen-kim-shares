import type { CSSProperties } from "react";
import type { ThemeConfig } from "@/theme/types";

export function getThemeCssVariables(theme: ThemeConfig): CSSProperties {
  const { colors } = theme;

  return {
    "--brand-primary": colors.primary,
    "--brand-primary-hover": colors.primaryHover,
    "--brand-primary-soft": colors.primarySoft,
    "--brand-primary-strong": colors.primaryStrong,
    "--brand-primary-deep": colors.primaryDeep,
    "--brand-primary-glow": colors.primaryGlow,
    "--theme-page-bg": colors.pageBg,
    "--theme-page-bg-rgb": colors.pageBgRgb,
    "--theme-section-bg": colors.sectionBg,
    "--theme-section-soft": colors.sectionSoft,
    "--theme-surface": colors.surface,
    "--theme-text": colors.text,
    "--theme-muted-text": colors.mutedText,
    "--theme-border": colors.border,
    "--theme-price": colors.price,
    "--theme-cta": colors.cta,
    "--theme-cta-hover": colors.ctaHover,
    "--theme-cta-foreground": colors.ctaForeground,
    "--theme-badge-bg": colors.badgeBg,
    "--theme-badge-text": colors.badgeText,
    "--theme-badge-border": colors.badgeBorder,
    "--theme-nav-bg": colors.navBg,
    "--theme-nav-text": colors.navText,
    "--theme-footer-bg": colors.footerBg,
    "--theme-footer-text": colors.footerText,
    "--primary": colors.primaryHsl,
    "--primary-foreground": colors.primaryForegroundHsl,
    "--secondary": colors.secondaryHsl,
    "--secondary-foreground": colors.secondaryForegroundHsl,
    "--card": colors.cardHsl,
    "--card-foreground": colors.cardForegroundHsl,
    "--foreground": colors.foregroundHsl,
    "--muted": colors.mutedHsl,
    "--muted-foreground": colors.mutedForegroundHsl,
    "--border": colors.borderHsl,
    "--input": colors.inputHsl,
    "--ring": colors.ringHsl,
    "--accent": colors.accentHsl,
    "--accent-foreground": colors.accentForegroundHsl,
  } as CSSProperties;
}
