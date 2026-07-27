import { getAll, getCategory } from "@/apis/models/recruitment.apis";
import CallToAction from "@/components/recruitment/CallToAction";
import CompanyIntro from "@/components/recruitment/CompanyIntro";
import HeroSection from "@/components/recruitment/HeroSection";
import JobGrid from "@/components/recruitment/JobGrid";
import LifeCompany from "@/components/recruitment/LifeCompany";
import { PARAMS_RECRUITMENT } from "@/constants/values.constant";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";

export default async function Page({ params, searchParams }: Props) {
  const page = searchParams["page"] ?? "1";
  const category = searchParams[PARAMS_RECRUITMENT.CATEGORY] ?? "";
  const search = searchParams[PARAMS_RECRUITMENT.NAME] ?? "";
  const [responseJobs, responseCategories] = await Promise.all([
    getAll(page, category, search),
    getCategory(),
  ]);

  const jobs = getValidData(responseJobs);
  const categories = getValidData(responseCategories);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CompanyIntro />
      <JobGrid
        data={jobs}
        nameJob={search}
        category={category}
        categories={categories}
      />
      <LifeCompany />
      <CallToAction />
    </main>
  );
}
