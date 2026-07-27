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
        <h1 className="text-3xl font-bold uppercase text-gray-800">
          Giải pháp cho doanh nghiệp
        </h1>
        <p className="text-gray-500 mt-2">
          Cập nhật những giải pháp công nghệ mới nhất dành cho doanh nghiệp
        </p>
      </div>
      <ListBusinessSolutions data={data} page={page} />
    </div>
  );
}
