"use client";

import { i18nText } from "@/lib/i18nText";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { findOne } from "@/apis/models/order.apis";
import { IOrderDetail } from "@/interfaces/models/IOrder.interface";
import { toast } from "sonner";
import { getPrice, getValidData } from "@/lib/utils";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [orderData, setOrderData] = useState<IOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        // Thêm timeout để đảm bảo orderId được truyền
        setTimeout(() => {
          if (!orderId) {
            toast.error(i18nText("AUTO.app.xac.nhan.thanh.toan.line27_0_khong_tim_thay_thong_tin"));
            router.replace("/");
          }
        }, 1000);
        setLoading(false);
        return;
      }

      try {
        const response = await findOne(String(orderId));
        const validData = getValidData(response);

        if (validData) {
          setOrderData(validData);
        } else {
          console.error("No valid data from response:", response);
          toast.error(i18nText("AUTO.app.xac.nhan.thanh.toan.line43_1_khong_thong_tin_don_hang"));
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error(i18nText("AUTO.app.xac.nhan.thanh.toan.line47_2_da_xay_ra_loi_khi"));
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-lg h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{i18nText("AUTO.app.xac.nhan.thanh.toan.line61_3_dang_thong_tin_don_hang")}</p>
        </div>
      </main>
    );
  }

  if (!orderData) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">{i18nText("AUTO.app.xac.nhan.thanh.toan.line72_4_khong_tim_thay_thong_tin")}</p>
          <Button className="mt-4" onClick={() => (window.location.href = "/")}>{i18nText("AUTO.app.xac.nhan.thanh.toan.line75_5_quay_lai_trang_chu")}</Button>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getShippingMethodText = (method: string) => {
    return method === "delivery" ? i18nText("AUTO.app.xac.nhan.thanh.toan.extra84_0_giao_hang_tan_noi") : i18nText("AUTO.app.xac.nhan.thanh.toan.extra84_1_nhan_hang");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <Card className="p-6 border-slate-200">
          {/* Success Header */}
          <div className="flex justify-center mb-6 pb-6 border-b border-slate-200">
            <div className="flex items-center justify-center gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-lg bg-green-100">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{i18nText("AUTO.app.xac.nhan.thanh.toan.line104_6_cam_on_quy_khach_da")}</h1>
                <p className="text-slate-600 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line107_7_ma_don_hang")}{" "}
                  <span className="font-semibold text-blue-600">
                    #{orderData.orderCode}
                  </span>
                </p>
                <p className="text-slate-600 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line113_8_ngay_dat_hang")}{orderData.dateOrder}
                </p>
                <p className="text-slate-600 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line116_9_email_xac_nhan_da_duoc")}{" "}
                  <span className="font-semibold">
                    {orderData.emailDelivery}
                  </span>
                </p>
                <p className="text-slate-600 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line122_10_xin_vui_long_kiem_tra")}</p>
              </div>
            </div>
          </div>

          {/* Order & Delivery Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">{i18nText("AUTO.app.xac.nhan.thanh.toan.line132_11_thong_tin_mua_hang")}</h2>
              <div className="space-y-3 text-base">
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line136_12_ten_cong_ty")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.nameCompany || i18nText("AUTO.app.xac.nhan.thanh.toan.line138_13_khong")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line142_14_dia_chi_cong_ty")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.addressCompany || i18nText("AUTO.app.xac.nhan.thanh.toan.line144_15_khong")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line148_16_email_cong_ty")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.emailCompany || i18nText("AUTO.app.xac.nhan.thanh.toan.line150_17_khong")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line154_18_so_dien_thoai_cong_ty")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.phoneCompany || i18nText("AUTO.app.xac.nhan.thanh.toan.line156_19_khong")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">{i18nText("AUTO.app.xac.nhan.thanh.toan.line164_20_thong_tin_nhan_hang")}</h2>
              <div className="space-y-3 text-base">
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line168_21_ho_ten")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.nameDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line174_22_dia_chi")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.addressDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.extra166_2_email")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.emailDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{i18nText("AUTO.app.xac.nhan.thanh.toan.line186_23_so_dien_thoai")}</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.phoneDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Shipping Methods */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{i18nText("AUTO.app.xac.nhan.thanh.toan.line199_24_phuong_thuc_thanh_toan")}</h2>
              <p className="text-slate-700 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line202_25_thanh_toan_chuyen_khoan_truc")}</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{i18nText("AUTO.app.xac.nhan.thanh.toan.line208_26_phuong_thuc_van_chuyen")}</h2>
              <p className="text-slate-700 text-base">
                {getShippingMethodText(orderData.shippingMethod)}
              </p>
            </div>
          </div>

          {/* Note */}
          {orderData.note && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{i18nText("AUTO.app.xac.nhan.thanh.toan.line219_27_ghi_chu")}</h2>
              <p className="text-slate-700 text-base">{orderData.note}</p>
            </div>
          )}
        </Card>

        {/* Bank Transfer Section */}
        <Card className="p-6 border-slate-200">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <Image
                src="/images/orderConfirm/thanh-toan.png"
                alt={i18nText("AUTO.app.xac.nhan.thanh.toan.line231_28_qr_code_payment")}
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>

            <div className="w-full text-center">
              <div className="border-t pt-6">
                <p className="text-lg text-slate-600 font-semibold mb-3">{i18nText("AUTO.app.xac.nhan.thanh.toan.line241_29_noi_dung_chuyen_khoan")}</p>
                <p className="text-2xl font-bold text-red-600">
                  {orderData.orderCode}-{i18nText("AUTO.app.xac.nhan.thanh.toan.line244_30_ma_so_thue_da_dang")}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{i18nText("AUTO.app.xac.nhan.thanh.toan.line254_31_danh_sach_san_pham")}</h2>
            <div className="space-y-4">
              {orderData.items && orderData.items.length > 0 ? (
                orderData.items.map((item, index) => (
                  <div key={`${item.id}-${index}`}>
                    <div className="flex gap-4 pb-4">
                      <div className="border border-slate-200 rounded-lg p-2 flex-shrink-0">
                        <Image
                          src={item.picture || "/placeholder.svg"}
                          alt={item.name || i18nText("AUTO.app.xac.nhan.thanh.toan.line264_32_san_pham")}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 text-base">
                          {item?.name}
                        </h3>
                        <div className="flex items-end justify-between gap-2">
                          <div className="text-base">
                            <p className="text-slate-600">{i18nText("AUTO.app.xac.nhan.thanh.toan.line277_33_so_luong")}{" "}
                              <span className="font-semibold text-red-600">
                                {item.quantity}
                              </span>
                            </p>
                          </div>
                          <div>
                            <span className="text-red-600 font-medium text-sm md:text-base lg:text-base">
                              {getPrice(item)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-600">{i18nText("AUTO.app.xac.nhan.thanh.toan.line294_34_khong_san_pham_nao")}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line301_35_tam_tinh")}</span>
              <span className="text-slate-900 font-semibold text-base">
                {orderData.totalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line307_36_phi_van_chuyen")}</span>
              <span className="text-slate-900 font-semibold text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line309_37_kinh_doanh_phan_hoi")}</span>
            </div>
            {orderData.couponCode && (
              <div className="flex justify-between items-center">
                <span className="text-slate-700 text-base">{i18nText("AUTO.app.xac.nhan.thanh.toan.line315_38_ma_giam_gia")}{orderData.couponCode}):
                </span>
                <span className="text-slate-900 font-semibold text-base">
                  -{(orderData.couponValue || 0).toLocaleString("vi-VN")}₫
                </span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900">{i18nText("AUTO.app.xac.nhan.thanh.toan.line324_39_tong_cong")}</span>
              <span className="text-2xl font-bold text-red-600">
                {orderData.finalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>
          <Button
            onClick={() => router.replace("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-3"
          >{i18nText("AUTO.app.xac.nhan.thanh.toan.line335_40_quay_lai_trang_chu")}</Button>
        </Card>
      </div>
    </main>
  );
}

