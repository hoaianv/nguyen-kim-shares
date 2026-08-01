import { i18nText } from "@/lib/i18nText";
import React from "react";
import ListBusinessSolutions from "@/components/businessSolution/ListBusinessSolutions";
import { getListNews } from "@/apis/models/news.apis";
import { getValidData } from "@/lib/utils";

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BusinessSolutionPage({ searchParams }: IProps) {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const SLUG_BUSINESS_SOLUTION = "kenh-giai-phap-cho-doanh-nghiep";

  const res = await getListNews(SLUG_BUSINESS_SOLUTION, page);
  const data = getValidData(res) ?? undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold uppercase text-gray-800">{i18nText("AUTO.app.giai.phap.doanh.nghiep.line21_0_giai_phap_doanh_nghiep")}</h1>
        <p className="text-gray-500 mt-2">{i18nText("AUTO.app.giai.phap.doanh.nghiep.line24_1_cap_nhat_nhung_giai_phap")}</p>
      </div>
      <ListBusinessSolutions data={data} page={page} />
    </div>
  );
}
