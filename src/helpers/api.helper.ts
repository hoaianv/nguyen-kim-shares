"use server";
import { CONST_VALUES } from "@/constants/values.constant";
import { cookies } from "next/headers";
interface IOptions {
  url: string;
  options: RequestInit;
}

export const api = async <TypeResult>({
  url,
  options,
}: IOptions): Promise<TypeResult> => {
  let headers: HeadersInit;

  if (options.body instanceof FormData) {
    headers = {
      ...options.headers,
      Authorization: `Bearer ${cookies().get(CONST_VALUES.TOKEN)?.value}`,
    };
  } else {
    headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get(CONST_VALUES.TOKEN)?.value}`,
    };
  }

  const dataOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  let response = await fetch(url, dataOptions);

  let result: TypeResult = await response.json();

  return result;
};
