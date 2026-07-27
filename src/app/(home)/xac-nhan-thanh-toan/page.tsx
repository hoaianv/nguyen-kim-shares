"use client";

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
            toast.error("Không tìm thấy thông tin đơn hàng");
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
          toast.error("Không thể tải thông tin đơn hàng");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Đã xảy ra lỗi khi tải thông tin đơn hàng");
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
          <p className="text-slate-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </main>
    );
  }

  if (!orderData) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">
            Không tìm thấy thông tin đơn hàng
          </p>
          <Button className="mt-4" onClick={() => (window.location.href = "/")}>
            Quay lại trang chủ
          </Button>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getShippingMethodText = (method: string) => {
    return method === "delivery" ? "Giao hàng tận nơi" : "Nhận tại cửa hàng";
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
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Cảm ơn quý khách đã đặt hàng tại Nguyên Kim
                </h1>
                <p className="text-slate-600 text-base">
                  Mã đơn hàng:{" "}
                  <span className="font-semibold text-blue-600">
                    #{orderData.orderCode}
                  </span>
                </p>
                <p className="text-slate-600 text-base">
                  Ngày đặt hàng: {orderData.dateOrder}
                </p>
                <p className="text-slate-600 text-base">
                  Email xác nhận đã được gửi đến:{" "}
                  <span className="font-semibold">
                    {orderData.emailDelivery}
                  </span>
                </p>
                <p className="text-slate-600 text-base">
                  Xin vui lòng kiểm tra email của bạn.
                </p>
              </div>
            </div>
          </div>

          {/* Order & Delivery Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Thông tin mua hàng
              </h2>
              <div className="space-y-3 text-base">
                <div>
                  <p className="text-slate-600 mb-1">Tên công ty:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.nameCompany || "Không có"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Địa chỉ công ty:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.addressCompany || "Không có"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Email công ty:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.emailCompany || "Không có"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Số điện thoại công ty:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.phoneCompany || "Không có"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Thông tin nhận hàng
              </h2>
              <div className="space-y-3 text-base">
                <div>
                  <p className="text-slate-600 mb-1">Họ và tên:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.nameDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Địa chỉ:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.addressDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Email:</p>
                  <p className="text-slate-900 font-semibold">
                    {orderData.emailDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Số điện thoại:</p>
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
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Phương thức thanh toán
              </h2>
              <p className="text-slate-700 text-base">
                Thanh toán chuyển khoản trực tiếp
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Phương thức vận chuyển
              </h2>
              <p className="text-slate-700 text-base">
                {getShippingMethodText(orderData.shippingMethod)}
              </p>
            </div>
          </div>

          {/* Note */}
          {orderData.note && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Ghi chú</h2>
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
                alt="QR Code Payment"
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>

            <div className="w-full text-center">
              <div className="border-t pt-6">
                <p className="text-lg text-slate-600 font-semibold mb-3">
                  Nội dung chuyển khoản:
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {orderData.orderCode}-{" Mã số thuế đã đăng ký"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Danh sách sản phẩm
            </h2>
            <div className="space-y-4">
              {orderData.items && orderData.items.length > 0 ? (
                orderData.items.map((item, index) => (
                  <div key={`${item.id}-${index}`}>
                    <div className="flex gap-4 pb-4">
                      <div className="border border-slate-200 rounded-lg p-2 flex-shrink-0">
                        <Image
                          src={item.picture || "/placeholder.svg"}
                          alt={item.name || "Sản phẩm"}
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
                            <p className="text-slate-600">
                              Số lượng:{" "}
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
                <p className="text-slate-600">Không có sản phẩm nào</p>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-base">Tạm tính:</span>
              <span className="text-slate-900 font-semibold text-base">
                {orderData.totalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-base">Phí vận chuyển:</span>
              <span className="text-slate-900 font-semibold text-base">
                Kinh doanh phản hồi
              </span>
            </div>
            {orderData.couponCode && (
              <div className="flex justify-between items-center">
                <span className="text-slate-700 text-base">
                  Mã giảm giá ({orderData.couponCode}):
                </span>
                <span className="text-slate-900 font-semibold text-base">
                  -{(orderData.couponValue || 0).toLocaleString("vi-VN")}₫
                </span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900">
                Tổng cộng:
              </span>
              <span className="text-2xl font-bold text-red-600">
                {orderData.finalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>
          <Button
            onClick={() => router.replace("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-3"
          >
            Quay lại trang chủ
          </Button>
        </Card>
      </div>
    </main>
  );
}

