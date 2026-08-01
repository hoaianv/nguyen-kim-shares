import enMessages from "../../messages/en.json";
import viMessages from "../../messages/vi.json";

type Locale = "vi" | "en";
type Values = Record<string, string | number | boolean | null | undefined>;

const messagesByLocale = {
  vi: viMessages,
  en: enMessages,
} as const;

function readCookie(name: string) {
  if (typeof document === "undefined") {
    try {
      const nextHeaders = (0, eval)("require")("next/headers") as typeof import("next/headers");
      return nextHeaders.cookies().get(name)?.value ?? null;
    } catch {
      return null;
    }
  }

  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCurrentLocale(): Locale {
  const locale = readCookie("languages_code");
  return locale === "en" ? "en" : "vi";
}

function readMessage(messages: unknown, key: string) {
  return key.split(".").reduce<unknown>((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[part];
  }, messages);
}

export function i18nText(key: string, values?: Values, locale = getCurrentLocale()) {
  const messages = messagesByLocale[locale] ?? messagesByLocale.vi;
  const fallbackMessages = messagesByLocale.vi;
  const value = readMessage(messages, key) ?? readMessage(fallbackMessages, key);
  const text = typeof value === "string" ? value : key;

  if (!values) return text;

  return text.replace(/\{(\w+)\}/g, (_, name: string) => {
    const replacement = values[name];
    return replacement == null ? "" : String(replacement);
  });
}
