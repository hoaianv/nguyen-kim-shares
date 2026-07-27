import { findOne, findRelated } from "@/apis/models/recruitment.apis";
import NotFoundPage from "@/components/common/NotFoundPage";
import JobDetail from "@/components/recruitmentDetail/jobDetail";
import { LazySection } from "@/components/ui/lazySection";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";

export default async function Page({ params }: Props) {
  const [related, detail] = await Promise.all([
    findRelated(params.slug),
    findOne(params.slug),
  ]);
  const dataDetail = getValidData(detail);
  const dataRelated = getValidData(related);

  return dataDetail ? (
    <JobDetail
      data={{ job: dataDetail.items, breadcrumb: dataDetail.breadcrumb }}
      relatedJobs={dataRelated ?? []}
    />
  ) : (
    <LazySection height="h-48">
      <NotFoundPage />
    </LazySection>
  );
}
