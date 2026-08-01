import { i18nText } from "@/lib/i18nText";
export const formatCurrency = (amount: number) => {
  const validAmount = Number(amount);

  if (isNaN(validAmount) || validAmount <= 0) return i18nText("AUTO.until.index.extra4_0_lien_he");

  return validAmount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const parseBirthday = (str: string) => {
  const [day, month, year] = str.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export function getLastNameFirstLetter(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return "";

  const lastWord = parts[parts.length - 1];

  return lastWord.charAt(0).toUpperCase();
}

export const fromISODateOnly = (s?: string | null): Date | undefined => {
  if (!s) return undefined;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return undefined;
  const [, y, mo, d] = m;
  return new Date(Number(y), Number(mo) - 1, Number(d)); // 00:00 local, không lệch TZ
};
export const toISODateOnly = (d?: Date | null): string | null => {
  if (!(d instanceof Date) || isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
