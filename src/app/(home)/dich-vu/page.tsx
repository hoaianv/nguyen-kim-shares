import { getAll } from "@/apis/models/services.apis";
import CardService from "@/components/service/cardService";
import { ServiceEmpty } from "@/components/service/ServiceEmpty";
import Breadcrumb from "@/components/ui/breadcrumb";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { getValidData } from "@/lib/utils";

interface PageProps {
  searchParams: { [key: string]: string };
}

export default async function page({ searchParams }: PageProps) {
  const page = searchParams["page"] ?? "1";

  const response = await getAll(page);
  const data = getValidData(response);

  return (
    <div
      className="mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20
"
    >
      <div className="pt-2">
        <Breadcrumb items={[{ name: "Dịch vụ", url: "/dich-vu" }]} />
      </div>

      {data && data?.items.length > 0 ? (
        <div className="mt-2">
          <div
            className="grid 
            gap-3
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4"
          >
            {data?.items?.map((item) => (
              <CardService data={item} key={item.id} />
            ))}
          </div>
          <PaginationDynamic data={data?.pagination} />
        </div>
      ) : (
        <ServiceEmpty />
      )}
    </div>
  );
}
