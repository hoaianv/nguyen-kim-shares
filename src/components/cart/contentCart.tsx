"use client";

import { i18nText } from "@/lib/i18nText";
import { CardCart } from "@/components/cart/cardCart";
import CouponCard from "@/components/common/couponCard";
import Breadcrumb from "@/components/ui/breadcrumb";
import CheckboxField from "@/components/ui/checkboxField";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import Modal from "@/components/ui/Modal";
import { useCartActions } from "@/hooks/useCartActions";
import { useQuoteActions } from "@/hooks/useQuoteActions";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContentCart() {
  const [open, setOpen] = useState(false);

  const { removeCart } = useCartActions();

  const {
    cart,
    selectedIds,
    selectAll,
    clearSelected,
    setCouponCode,
    couponCode,
    couponActive,
    setCouponActive,
  } = useCartStore();
  const { quote } = useQuoteActions();
  const isAllSelected =
    cart.items.length > 0 && selectedIds.length === cart.items.length;
  const hasSelectedItems = selectedIds.length > 0;
  const router = useRouter();

  const invoiceTableHeaders = [
    { id: 1, text: i18nText("AUTO.components.cart.contentcart.extra39_0_chon_tat_ca") },
    { id: 2, text: i18nText("AUTO.components.cart.contentcart.extra40_1_mo_ta") },
    { id: 3, text: i18nText("AUTO.components.cart.contentcart.extra41_2_gia") },
    { id: 4, text: i18nText("AUTO.components.cart.contentcart.extra42_3_so_luong") },
    { id: 5, text: i18nText("AUTO.components.cart.contentcart.extra43_4_tong") },
    { id: 6, text: i18nText("AUTO.components.cart.contentcart.extra44_5_xoa") },
  ];

  return (
    <div>
      <div className="pt-2">
        <Breadcrumb items={[{ name: i18nText("AUTO.components.cart.contentcart.line49_0_gio_hang"), url: "/cart" }]} />
      </div>

      <div className="py-2">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold sm:text-xl">{i18nText("AUTO.components.cart.contentcart.line57_1_gio_hang")}{cart.totalItem})
              </span>

              <ConfirmPopover
                trigger={
                  <button className="text-xs text-red-600 hover:text-red-700 sm:text-sm">{i18nText("AUTO.components.cart.contentcart.line63_2_xoa_tat_ca")}</button>
                }
                title={i18nText("AUTO.components.cart.contentcart.line66_3_xoa_san_pham")}
                description={i18nText("AUTO.components.cart.contentcart.extra65_6_chac_chan_muon_xoa_san")}
                onConfirm={() => removeCart(selectedIds)}
                position="bottom"
              />
            </div>

            <div className="rounded-lg bg-white">
              <div className="hidden rounded-t-md border-y border-gray-200 bg-gray-50 md:block">
                <div className="grid grid-cols-[120px_minmax(0,2fr)_minmax(140px,1fr)_120px_140px_56px] gap-3 px-4 py-3">
                  {invoiceTableHeaders.map((item) =>
                    item.id === 1 ? (
                      <div key={item.id} className="flex items-center gap-2">
                        <CheckboxField
                          id="checkbox-all-desktop"
                          checked={isAllSelected}
                          onChange={() =>
                            isAllSelected ? clearSelected() : selectAll()
                          }
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {item.text}
                        </span>
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className="flex items-center justify-center"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item.text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-t-md border-b border-gray-200 bg-gray-50 px-3 py-3 md:hidden">
                <div className="flex items-center gap-2">
                  <CheckboxField
                    id="checkbox-all-mobile"
                    checked={isAllSelected}
                    onChange={() =>
                      isAllSelected ? clearSelected() : selectAll()
                    }
                  />
                  <span className="text-sm font-medium text-gray-700">{i18nText("AUTO.components.cart.contentcart.line114_4_chon_tat_ca")}</span>
                </div>
              </div>

              <div className="px-1 py-3 sm:px-2">
                {cart.items.length === 0 ? (
                  <p className="py-8 text-center text-sm text-gray-600">{i18nText("AUTO.components.cart.contentcart.line122_5_gio_hang")}</p>
                ) : (
                  <div className="divide-y divide-gray-100 md:max-h-[calc(100vh-340px)] md:overflow-y-auto md:pr-1 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                    {cart.items.map((item) => (
                      <CardCart key={item.id} id={item.id} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-4">
            <div className="rounded-lg bg-white p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold sm:text-base">{i18nText("AUTO.components.cart.contentcart.line139_6_khuyen_mai")}</span>
                <button
                  disabled={!quote?.coupon?.length}
                  onClick={() => setOpen(true)}
                  className="text-xs text-blue-600 hover:underline disabled:text-gray-400 sm:text-sm"
                >{i18nText("AUTO.components.cart.contentcart.line146_7_chon_hoac_nhap_khuyen_mai")}</button>
              </div>

              {couponActive &&
              quote?.coupon?.some((c) => c.id === couponActive.id) &&
              couponActive.couponDes?.length
                ? couponActive.couponDes.map(
                    (i) =>
                      i.code === couponCode && (
                        <CouponCard
                          key={i.id}
                          coupon={couponActive}
                          des={i}
                          isSelected
                          onToggle={() => {
                            setCouponCode("");
                            setCouponActive(null);
                          }}
                          removable
                        />
                      )
                  )
                : null}

              {(quote?.coupon?.length ?? 0) === 0 ? (
                <span className="block text-xs text-gray-500 sm:text-sm">{i18nText("AUTO.components.cart.contentcart.line173_8_don_hang_chua_du_dieu")}</span>
              ) : (
                <Modal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  size="md"
                  title={i18nText("AUTO.components.cart.contentcart.line181_9_khuyen_mai_ma_giam_gia")}
                >
                  <div className="max-h-[70vh] overflow-y-auto p-1 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 sm:max-h-[600px]">
                    {quote?.coupon?.flatMap(
                      (item) =>
                        item?.couponDes?.map((i) => (
                          <CouponCard
                            key={i.id}
                            coupon={item}
                            des={i}
                            isSelected={i.code === couponCode}
                            onToggle={() => {
                              setCouponCode(i.code === couponCode ? "" : i.code);
                              setCouponActive(
                                i.code === couponCode ? null : item
                              );
                            }}
                          />
                        )) || []
                    )}
                  </div>
                </Modal>
              )}
            </div>

            <div className="rounded-lg border-t border-gray-200 bg-white p-3 sm:p-4">
              <span className="mb-3 block text-sm font-semibold sm:text-base">{i18nText("AUTO.components.cart.contentcart.line208_10_thanh_toan")}</span>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 sm:text-sm">{i18nText("AUTO.components.cart.contentcart.line214_11_tong_tam_tinh")}</span>
                  <span className="text-xs font-semibold sm:text-sm">
                    {formatPrice(quote?.totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-gray-600 sm:text-sm">{i18nText("AUTO.components.cart.contentcart.line223_12_giam_gia")}</span>
                  <span className="font-medium">
                    {couponCode ? (
                      <div className="flex items-center gap-2">
                        <div className="flex w-fit items-center justify-center rounded-lg border border-[#1230B0] p-1">
                          <span className="text-xs text-[#1230B0]">
                            {couponCode}
                          </span>
                        </div>
                        <span className="text-xs font-semibold sm:text-sm">
                          - {formatPrice(couponActive?.value)}
                        </span>
                      </div>
                    ) : (
                      i18nText("AUTO.components.cart.contentcart.line238_13_0d")
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-xs text-gray-600 sm:text-sm">{i18nText("AUTO.components.cart.contentcart.line245_14_thanh_tien")}</span>
                  <span className="text-base font-semibold text-gray-900 sm:text-lg">
                    {formatPrice(quote?.finalPrice)}
                  </span>
                </div>

                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">{i18nText("AUTO.components.cart.contentcart.line254_15_da_bao_gom_vat")}</span>
                </div>

                <div className="flex items-center gap-1 pt-3">
                  <button
                    onClick={() => router.push("/san-pham")}
                    className="w-full cursor-pointer rounded-lg border border-amber-300 px-4 py-2.5 text-center text-xs font-bold text-amber-800 transition-colors duration-200 sm:py-2 sm:text-sm"
                  >{i18nText("AUTO.components.cart.contentcart.line263_16_tiep_tuc_mua_sam")}</button>
                  <button
                    disabled={!hasSelectedItems}
                    onClick={() => router.push("/thanh-toan")}
                    title={
                      hasSelectedItems
                        ? i18nText("AUTO.components.cart.contentcart.line270_17_tien_hanh_dat_hang")
                        : i18nText("AUTO.components.cart.contentcart.line271_18_hay_chon_it_nhat_1")
                    }
                    className="w-full cursor-pointer rounded-lg border border-amber-300 bg-[#ffb716] px-4 py-2.5 font-bold text-white transition-colors duration-200 hover:bg-amber-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-500 sm:py-2 sm:text-sm"
                  >{i18nText("AUTO.components.cart.contentcart.line275_19_tien_hanh_dat_hang")}</button>
                </div>
                {!hasSelectedItems ? (
                  <p className="text-xs text-amber-700">{i18nText("AUTO.components.cart.contentcart.line280_20_hay_chon_it_nhat_1")}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
