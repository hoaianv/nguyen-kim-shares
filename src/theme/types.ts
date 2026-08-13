export type ThemeKey = "default" | "christmas";

export type ThemeStatus = "draft" | "scheduled" | "published" | "disabled";

export type ThemeAssetSlot =
  | "topCampaignBanner"
  | "homeHeroDesktop"
  | "homeHeroMobile"
  | "categoryHero"
  | "homeMidCampaign"
  | "productPromo"
  | "cornerPattern"
  | "sectionPattern"
  | "cartDecoration"
  | "checkoutDecoration"
  | "footerDecoration"
  | "snowOverlay";

export type ThemeAsset = {
  desktop?: string;
  mobile?: string;
  alt: string;
  href?: string;
};

export type ThemeColors = {
  pageBg: string;
  pageBgRgb: string;
  sectionBg: string;
  sectionSoft: string;
  surface: string;
  primary: string;
  primaryHover: string;
  primarySoft: string;
  primaryStrong: string;
  primaryDeep: string;
  primaryGlow: string;
  primaryHsl: string;
  primaryForegroundHsl: string;
  secondaryHsl: string;
  secondaryForegroundHsl: string;
  cardHsl: string;
  cardForegroundHsl: string;
  foregroundHsl: string;
  mutedHsl: string;
  mutedForegroundHsl: string;
  borderHsl: string;
  inputHsl: string;
  ringHsl: string;
  accentHsl: string;
  accentForegroundHsl: string;
  text: string;
  mutedText: string;
  border: string;
  price: string;
  cta: string;
  ctaHover: string;
  ctaForeground: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  navBg: string;
  navText: string;
  footerBg: string;
  footerText: string;
};

export type ThemeEffects = {
  snow: {
    enabled: boolean;
    intensity: "low" | "medium";
    disableMobile: boolean;
  };
  lights: {
    enabled: boolean;
    intensity: "low";
  };
  glow: {
    enabled: boolean;
  };
  reducedMotionSafe: true;
};

export type ThemePageConfig = {
  enabled: boolean;
  decorationLevel: "none" | "minimal" | "low" | "medium" | "high";
};

export type ThemeConfig = {
  key: ThemeKey;
  name: string;
  status: ThemeStatus;
  effectiveFrom?: string;
  effectiveTo?: string;
  fallbackTheme: "default";
  previewMode: boolean;
  colors: ThemeColors;
  assets: Partial<Record<ThemeAssetSlot, ThemeAsset>>;
  effects: ThemeEffects;
  pages: {
    home: ThemePageConfig & {
      sectionOrder: string[];
      hiddenSections: string[];
    };
    category: ThemePageConfig & {
      insertCampaignBanner: boolean;
    };
    product: ThemePageConfig & {
      showGiftBlock: boolean;
    };
    cart: ThemePageConfig;
    checkout: ThemePageConfig;
  };
};
