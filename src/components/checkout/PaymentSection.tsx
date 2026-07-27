"use client";

import { Check } from "lucide-react";

const PaymentSection: React.FC<{}> = ({}) => {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6">
      <h3 className="mb-1 text-base font-semibold text-slate-950 sm:text-lg">
        Phương thức thanh toán
      </h3>
      <p className="mb-4 text-xs text-slate-500 sm:text-sm">
        Thông tin thanh toán của bạn sẽ luôn được bảo mật
      </p>

      <div className="relative overflow-hidden rounded-[24px] border border-amber-200 bg-amber-50/70 p-4">
        <div className="absolute right-0 top-0 h-0 w-0 border-t-0 border-r-[30px] border-b-[30px] border-l-0 border-solid border-transparent border-r-amber-400 sm:border-r-[36px] sm:border-b-[36px]" />

        <Check
          size={14}
          className="absolute right-2 top-2 text-white sm:h-4 sm:w-4"
        />

        <div className="flex items-center">
          <label htmlFor="vnpay" className="flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium text-slate-950 sm:text-base">
                Thanh toán chuyển khoản trực tiếp
              </span>
              <span className="w-fit rounded-full bg-slate-950 px-2 py-1 text-xs text-white">
                Phổ biến nhất
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Hỗ trợ thanh toán qua tất cả ngân hàng
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
