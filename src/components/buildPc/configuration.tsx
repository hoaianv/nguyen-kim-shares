"use client";
import BuildItem from "@/components/buildPc/BuildItem";
import ModalAccessories from "@/components/buildPc/ModalAccessories";
import Button from "@/components/ui/button";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import Modal from "@/components/ui/Modal";
import { configuration } from "@/constants";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import {
  IBuildPcCategory,
  IPayloadExport,
} from "@/interfaces/models/IBuildPc.interface";
import { ICartItem } from "@/interfaces/models/ICart.interfaces";
import { useStateStore } from "@/stores/stateStore";
import { useBuildPc } from "@/stores/useBuildPc";
import { ArrowDownToLine, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { api } from "@/helpers/api.helper";

type ConfigurationProps = {
  data: IBuildPcCategory[];
};

export default function Configuration({ data }: ConfigurationProps) {
  const {
    setBuildConfigs,
    buildConfigs,
    removeBuildItem,
    removeBuildConfig,
    active,
    setActive,
  } = useBuildPc();
  const { setLoading } = useStateStore();
  const t = useTranslations();

  const [open, setOpen] = useState<{
    status: boolean;
    data: IBuildPcCategory | null;
  }>({ status: false, data: null });

  const payload: IPayloadExport = useMemo(() => {
    const configs = buildConfigs[active] || {};

    return {
      items: Object.values(configs).map((item: ICartItem) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
  }, [buildConfigs, active]);

  const handleExport = async (items: IPayloadExport) => {
    try {
      setLoading(true);
      const response = await api<Blob>({
        url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.BUILD_PC}/${CONST_APIS_COMMON.EXPORT}`,
        options: {
          method: CONST_METHODS.POST,
          body: JSON.stringify(items),
        },
      });

      const blob = response;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bang-bao-gia.xlsx";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (itemUrl: string, value: ICartItem, delta: number) => {
    if (!active || !itemUrl || !value) return;
    setBuildConfigs(active, {
      ...buildConfigs[active],
      [itemUrl]: {
        ...value,
        quantity: value.quantity + delta,
      },
    });
  };
  return (
    <>
      <div className="col-span-1 lg:col-span-7">
        <div className="flex items-start justify-between gap-2">
          {/* Dãy button cấu hình: trượt ngang trên mobile */}
          <div className="flex gap-2 items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-full">
            {configuration.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActive(item.id)}
                variant={active === item.id ? "primary" : "secondary"}
                size="xs"
                className="mt-3 shrink-0"
              >
                {t("BUILD_PC.configuration")} {item.id}
              </Button>
            ))}
          </div>

          {/* Nhóm hành động: tự wrap khi hẹp */}
          <div className="flex gap-2 items-center flex-wrap justify-end">
            <ConfirmPopover
              trigger={
                <Button
                  icon={RefreshCcw}
                  variant="primary"
                  size="xs"
                  className="mt-3"
                >
                  {t("BUILD_PC.reload")}
                </Button>
              }
              title={t("BUILD_PC.reload_configuration")}
              description={t("BUILD_PC.confirm_reload_configuration")}
              onConfirm={() => removeBuildConfig(active)}
              position="bottom"
            />

            <Button
              icon={ArrowDownToLine}
              variant="ghost"
              size="xs"
              onClick={() => handleExport(payload)}
              className="mt-3"
            >
              {t("BUILD_PC.load_configuration")}
            </Button>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="space-y-2 sm:space-y-3">
            {(data ?? []).map((item) => {
              const value = buildConfigs?.[active ?? ""]?.[item.url] ?? null;
              return (
                <BuildItem
                  key={item.id ?? item.url}
                  item={item}
                  value={value}
                  onIncrease={(itemUrl, value) => {
                    if (!active) return;
                    updateQuantity(itemUrl, value, +1);
                  }}
                  onDecrease={(itemUrl, value) => {
                    if (!active) return;
                    updateQuantity(itemUrl, value, -1);
                  }}
                  onRemove={(itemUrl) => {
                    if (!active || !itemUrl) return;
                    removeBuildItem(active, itemUrl);
                  }}
                  onOpen={(data) => setOpen({ status: true, data })}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={open.status}
        onClose={() => setOpen({ status: false, data: null })}
        size="xl"
        title={t("BUILD_PC.select_component")}
      >
        <ModalAccessories activeConfig={active} data={open.data} />
      </Modal>
    </>
  );
}
