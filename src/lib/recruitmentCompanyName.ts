export const recruitmentCompanyName =
  "Công ty Cổ phần Công nghệ Vi tính Nguyên Kim";

const previousCompanyNames =
  /(?:Công ty TNHH\s+)?(?:Công ty Cổ phần Công nghệ Vi tính Nguyên Kim|Công ty Vi tính Nguyên Kim|Vi tính Nguyên Kim|Công ty Nguyên Kim|Nguyên Kim)/gi;

export function normalizeRecruitmentCompanyName(value?: string | null): string {
  return (
    value
      ?.replace(/^Life at\s+/i, "Cuộc sống tại ")
      .replace(previousCompanyNames, recruitmentCompanyName) ?? ""
  );
}
