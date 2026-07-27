import { ESlugType } from "@/interfaces/models/ISlug.interface";
import { productSearch } from "@/apis/models/category.apis";
import { IPagination } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import { ICategoryProductSearch } from "@/interfaces/models/ICategories.interface";
import { EMPTY_PAGINATION } from "@/constants";
import { IProduct } from "@/interfaces/models/IProduct.interface";

export type SearchParamsInput = Record<string, string | string[] | undefined>;

export const revalidate = 0;

const RESERVED_FILTER_KEYS: ReadonlySet<string> = new Set<string>([
  ESlugType.Brand,
  ESlugType.Demand,
  ESlugType.MinPrice,
  ESlugType.MaxPrice,
  ESlugType.Sort,
  "page",
  "perPage",
]);

export function getSingleValueFromSearchParams(
  params: SearchParamsInput,
  key: ESlugType
): string {
  const rawValue = params[key];
  return Array.isArray(rawValue) ? rawValue[0] : rawValue ?? "";
}

function appendDynamicOptionParams(
  queryParams: URLSearchParams,
  searchParams: SearchParamsInput
) {
  for (const [key, value] of Object.entries(searchParams)) {
    if (!key || RESERVED_FILTER_KEYS.has(key)) continue;
    const v = Array.isArray(value) ? value[0] : value ?? "";
    if (typeof v === "string" && v) {
      queryParams.set(key, v);
    }
  }
}

export function buildProductSearchQuery(
  categoryUrl: string,
  searchParams: SearchParamsInput
): string {
  const queryParams = new URLSearchParams({ catUrl: categoryUrl });

  const brandSlug = getSingleValueFromSearchParams(
    searchParams,
    ESlugType.Brand
  );
  const customerNeedSlug = getSingleValueFromSearchParams(
    searchParams,
    ESlugType.Demand
  );
  const minPriceParam = getSingleValueFromSearchParams(
    searchParams,
    ESlugType.MinPrice
  );
  const maxPriceParam = getSingleValueFromSearchParams(
    searchParams,
    ESlugType.MaxPrice
  );
  const sortParam = getSingleValueFromSearchParams(
    searchParams,
    ESlugType.Sort
  );
  const pageRaw = searchParams["page"];
  const perPageRaw = searchParams["perPage"];
  const pageParamRaw = Array.isArray(pageRaw) ? pageRaw[0] : pageRaw ?? "";
  const perPageParamRaw = Array.isArray(perPageRaw)
    ? perPageRaw[0]
    : perPageRaw ?? "";
  const pageParam =
    pageParamRaw && Number(pageParamRaw) > 0 ? pageParamRaw : "";
  const perPageParam =
    perPageParamRaw && Number(perPageParamRaw) > 0 ? perPageParamRaw : "";

  if (brandSlug) queryParams.set(ESlugType.Brand, brandSlug);
  if (customerNeedSlug) queryParams.set(ESlugType.Demand, customerNeedSlug);
  if (minPriceParam) queryParams.set(ESlugType.MinPrice, minPriceParam);
  if (maxPriceParam) queryParams.set(ESlugType.MaxPrice, maxPriceParam);
  if (sortParam) queryParams.set(ESlugType.Sort, sortParam);
  if (pageParam) queryParams.set("page", pageParam);
  if (perPageParam) queryParams.set("perPage", perPageParam);

  appendDynamicOptionParams(queryParams, searchParams);

  return queryParams.toString();
}

export async function fetchCategoryProducts(
  categoryUrl: string,
  searchParams: SearchParamsInput
): Promise<{ items: IProduct[]; pagination: IPagination }> {
  const payload = buildProductSearchQuery(categoryUrl, searchParams);

  const result = await productSearch(payload);
  const data = getValidData<ICategoryProductSearch>(result);
  if (!data)
    return {
      items: [],
      pagination: EMPTY_PAGINATION,
    };
  const { pagination, items } = data;

  return { items, pagination };
}
