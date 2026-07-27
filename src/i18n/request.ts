import { CONST_VALUES } from "@/constants/values.constant";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const locale = cookies().get(CONST_VALUES.LANGUAGES_CODE)?.value || "vi";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
