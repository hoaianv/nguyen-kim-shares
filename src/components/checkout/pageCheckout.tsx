"use client";

import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentSection from "@/components/checkout/PaymentSection";
import { IPayloadOrder } from "@/interfaces/models/IOrder.interface";
import { useAuthStore } from "@/stores/useAuth";
import { MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import TextArea from "@/components/ui/TextArea";
import ModalUserInfo from "@/components/checkout/ModalUserInfo";
import { address } from "@/constants/company.constant";
import { useCartStore } from "@/stores/useCartStore";
import { IAddress } from "@/interfaces/models/IAddress.interface";
import AddressGrid from "@/components/checkout/AddressGrid";

export default function PageCheckout({
  data,
  selected,
}: {
  data: IAddress[];
  selected: IAddress | null;
}) {
  const { selectedIds, couponCode } = useCartStore();
  const [editAddress, setEditAddress] = useState<IAddress | null>(null);
  const { user } = useAuthStore();
  const [payload, setPayload] = useState<IPayloadOrder>({
    name: selected?.name || "",
    phone: selected?.phone || "",
    address: selected?.address || "",
    email: selected?.email || "",
    shippingMethod: "delivery",
    note: "",
    couponCode: couponCode,
    cartId: selectedIds,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleEditAddress = (data: IAddress) => {
    setEditAddress(data);
    setOpen(true);
  };

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      couponCode,
    }));
  }, [couponCode]);

  const handleSelectAddress = (data: IAddress) => {
    setPayload((prev) => ({
      ...prev,
      email: data.email,
      address: data.address,
      name: data.name,
      phone: data.phone,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="order-2 space-y-4 lg:order-1 lg:col-span-2">
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-sm ring-1 ring-white/60 backdrop-blur">
          <div className="flex overflow-x-auto border-b border-slate-200/80 bg-slate-50/80">
            <button
              onClick={() =>
                setPayload((prev) => ({ ...prev, shippingMethod: "delivery" }))
              }
              className={`flex-1 px-4 py-3 text-center text-sm font-medium transition sm:px-6 sm:py-4 sm:text-base ${
                payload.shippingMethod === "delivery"
                  ? "border-b-2 border-amber-500 bg-white text-slate-950"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Nhận hàng tại nhà
            </button>

            <button
              onClick={() =>
                setPayload((prev) => ({ ...prev, shippingMethod: "pickup" }))
              }
              className={`flex-1 px-4 py-3 text-center text-sm font-medium transition sm:px-6 sm:py-4 sm:text-base ${
                payload.shippingMethod === "pickup"
                  ? "border-b-2 border-amber-500 bg-white text-slate-950"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Nhận tại cửa hàng
            </button>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Thông tin nhận hàng
            </h3>

            {payload.shippingMethod !== "delivery" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-start gap-3 rounded-[20px] border border-amber-200 bg-amber-50/80 p-4"
              >
                <MapPinHouse
                  size={18}
                  strokeWidth={1.75}
                  className="mt-1 flex-shrink-0 text-amber-600"
                />
                <span className="text-sm leading-relaxed font-medium text-slate-700 sm:text-base">
                  {address}
                </span>
              </motion.div>
            )}

            <AddressGrid
              user={user}
              addresses={data}
              selectedPayload={payload}
              onEditAddress={handleEditAddress}
              onSelectAddress={handleSelectAddress}
              onAddAddress={() => {
                setEditAddress(null);
                setOpen(true);
              }}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Ghi chú cho đơn hàng
              </label>
              <TextArea
                id="note"
                label="Mô tả"
                value={payload?.note || ""}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, note: e.target.value }))
                }
              />
            </div>
          </div>

          <ModalUserInfo
            editData={editAddress}
            setEditAddress={setEditAddress}
            onOpen={setOpen}
            open={open}
          />
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-sm">
          <PaymentSection />
        </div>
      </div>

      <div className="order-1 space-y-4 lg:order-2">
        <div className="lg:sticky lg:top-24">
          <OrderSummary payload={payload} />
        </div>
      </div>
    </div>
  );
}
