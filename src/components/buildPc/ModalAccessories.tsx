"use client";
import { i18nText } from "@/lib/i18nText";
import { getAccessories } from "@/apis/models/buildPc.apis";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import SelectField from "@/components/ui/select";
import {
  IAccessories,
  IBuildPcCategory,
} from "@/interfaces/models/IBuildPc.interface";
import { getMarketPrice, getPrice, getValidData } from "@/lib/utils";
import { useBuildPc } from "@/stores/useBuildPc";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AccessoryProps = {
  data: IBuildPcCategory | null;
  activeConfig: number | null;
};

export default function ModalAccessories({
  data,
  activeConfig,
}: AccessoryProps) {
  const { setBuildConfigs } = useBuildPc();
  const t = useTranslations();

  const [accessories, setAccessories] = useState<IAccessories | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    view: "DESC",
    price: "DESC",
    brand: "",
    search: "",
  });

  useEffect(() => {
    if (!data?.url) return;

    const fetchAccessories = async () => {
      setLoading(true);
      try {
        const response = await getAccessories(data.url, filter);
        setAccessories(getValidData(response));
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setLoading(false);
      }
    };

    const debouncedFetch = debounce(fetchAccessories, 300);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [data?.url, filter]);

  return (
    <div>
      <div className="border-b border-gray-200">
        <div
          className="flex 
          flex-col 
          gap-3 
          pb-3
          lg:flex-row
          lg:items-center"
        >
          <div
            className="w-full 
            flex 
            flex-col 
            gap-2 
            sm:flex-row 
            sm:items-center
            lg:gap-2"
          >
            <span
              className="text-sm 
              font-medium 
              text-[#333] 
              shrink-0
              text-center
              sm:text-left"
            >
              {t("COMMON.sort_by")}:
            </span>

            <div
              className="flex 
              gap-2 
              flex-wrap 
              justify-center
              sm:justify-start"
            >
              <div
                onClick={() => {
                  if (loading) return;
                  setFilter((prev) => ({
                    ...prev,
                    view: prev.view === "ASC" ? "DESC" : "ASC",
                  }));
                }}
                className={`px-2 
                  py-1 
                  rounded-lg 
                  border 
                  transition 
                  cursor-pointer
                  text-xs
                  sm:px-3
                  sm:text-sm
                  ${
                    filter.view === "ASC"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }
                  ${
                    loading
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                `}
              >
                <span className="font-medium"> {t("COMMON.best_selling")}</span>
              </div>

              <div
                onClick={() => {
                  if (loading) return;
                  setFilter((prev) => ({
                    ...prev,
                    price: prev.price === "ASC" ? "" : "ASC",
                  }));
                }}
                className={`px-2 
                  py-1 
                  rounded-lg 
                  border 
                  transition 
                  cursor-pointer
                  text-xs
                  sm:px-3
                  sm:text-sm
                  ${
                    filter.price === "ASC"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }
                  ${
                    loading
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                `}
              >
                <span className="font-medium">{t("COMMON.price_asc")}</span>
              </div>

              <div
                onClick={() => {
                  if (loading) return;
                  setFilter((prev) => ({
                    ...prev,
                    price: prev.price === "DESC" ? "" : "DESC",
                  }));
                }}
                className={`px-2 
                  py-1 
                  rounded-lg 
                  border 
                  transition 
                  cursor-pointer
                  text-xs
                  sm:px-3
                  sm:text-sm
                  ${
                    filter.price === "DESC"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }
                  ${
                    loading
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                `}
              >
                <span className="font-medium">{t("COMMON.price_desc")}</span>
              </div>
            </div>
          </div>

          <SelectField
            classProps="w-full"
            id="select-field"
            label=""
            options={(data?.brand ?? []).map((item) => ({
              value: item.url,
              label: item.title,
            }))}
            value={filter.brand ?? ""}
            placeholder={i18nText("AUTO.components.buildpc.modalaccessories.line209_0_chon_thuong_hieu")}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, brand: e.target.value }))
            }
          />
        </div>

        <div
          className="flex 
          flex-col 
          gap-2 
          mt-3
          sm:flex-row
          sm:items-center 
          sm:gap-3"
        >
          <span
            className="shrink-0 
            text-center
            sm:text-left
            sm:mb-6"
          >
            {t("COMMON.search")}:
          </span>
          <InputField
            value={filter.search}
            classProps="w-full"
            id="input-field"
            label={t("COMMON.search_accessories")}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
      </div>

      <div
        className="p-1 
          overflow-y-auto 
          scrollbar-thin 
          scrollbar-thumb-gray-300 
          scrollbar-track-gray-100 
          hover:scrollbar-thumb-gray-400
          h-[400px]
          sm:h-[500px]
          lg:h-[600px]"
      >
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loading variant="spinner" size="lg" />
          </div>
        ) : accessories?.items && accessories.items.length > 0 ? (
          accessories.items.map((item) => (
            <div
              key={item.id}
              className="p-2 
                border-b 
                border-gray-200 
                flex 
                flex-col 
                gap-3
                sm:flex-row
                sm:gap-2 
                sm:items-center"
            >
              <div
                className="flex 
                items-center 
                gap-3 
                flex-1"
              >
                <div
                  className="shrink-0 
                  p-1 
                  border 
                  border-gray-200 
                  rounded-lg
                  w-[70px] 
                  h-[70px]
                  sm:w-[80px] 
                  sm:h-[80px]
                  lg:w-[95px] 
                  lg:h-[95px]"
                >
                  <Image
                    src={item.picture}
                    width={90}
                    height={90}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-medium 
                    line-clamp-2
                    text-xs
                    sm:text-sm"
                  >
                    {item.name}
                  </h3>
                  {item?.brand && (
                    <span
                      className="text-gray-400 
                      block 
                      mt-1
                      text-xs"
                    >
                      {t("COMMON.brand")}: {item.brand}
                    </span>
                  )}

                  <div
                    className="flex 
                    gap-2 
                    items-center 
                    mt-2
                    flex-wrap"
                  >
                    <span
                      className="text-red-600 
                      font-medium 
                      text-sm
                      sm:text-base"
                    >
                      {getPrice(item)}
                    </span>

                    {getMarketPrice(item) && (
                      <s className="text-gray-400 text-xs">
                        {getMarketPrice(item)}
                      </s>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="flex 
                justify-center
                sm:justify-end
                sm:w-[80px]"
              >
                {item.isInStock && (
                  <Button
                    onClick={() => {
                      if (!activeConfig || !data?.url) return;

                      setBuildConfigs(activeConfig, {
                        [data.url]: { ...item, quantity: 1 },
                      });
                      toast.success(i18nText("AUTO.components.buildpc.modalaccessories.line361_1_da_chon_linh_kien"), {
                        description: i18nText("AUTO.components.buildpc.modalaccessories.extra363_0_da_chon") + item.name,
                        position: "top-center",
                      });
                    }}
                    variant="primary"
                    size="sm"
                    className="mt-0
                      px-4
                      py-2
                      text-xs
                      sm:mt-3
                      sm:text-sm"
                  >
                    {t("COMMON.choose")}
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-6 text-center h-full bg-gray-50 rounded-lg">
            <div className="text-gray-500">
              <svg
                className="w-8 h-8 mx-auto mb-3 text-gray-400
                  sm:w-10 sm:h-10
                  lg:w-12 lg:h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p
                className="text-xs font-medium
                sm:text-sm"
              >{i18nText("AUTO.components.buildpc.modalaccessories.line403_2_khong_phu_kien_nao")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

