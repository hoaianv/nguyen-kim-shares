import Image from "next/image";
import { ICoupon, ICouponDes } from "@/interfaces/models/IProduct.interface";
import { useTranslations } from "next-intl";

interface CouponCardProps {
  coupon: ICoupon;
  des: ICouponDes;
  isSelected: boolean;
  onToggle: () => void;
  removable?: boolean; // để hiển thị "Bỏ chọn" khi đang active
}

export default function CouponCard({
  coupon,
  des,
  isSelected,
  onToggle,
  removable = false,
}: CouponCardProps) {
  const t = useTranslations();

  return (
    <div
      key={des.id}
      className={`p-2 sm:p-3 border gap-2 sm:gap-3 ${
        isSelected ? "border-[#1230B0] bg-[#F3F5FC]" : "border-gray-200"
      } rounded-lg flex items-center my-2`}
    >
      {/* Coupon Icon */}
      <div className="shrink-0 rounded-lg bg-[#E8EBF9] w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
        <Image
          src="/images/use/discount.png"
          width={35}
          height={35}
          alt={des.code || "coupon"}
          className="sm:w-[45px] sm:h-[45px]"
        />
      </div>

      {/* Coupon Content */}
      <div className="w-full h-full min-w-0">
        {/* Title and Code */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center p-1 border w-fit border-[#1230B0] rounded-lg">
            <span className="text-xs text-[#1230B0] font-medium">
              {des.code}
            </span>
          </div>
          <span className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">
            {coupon.title}
          </span>
        </div>

        {/* Description */}
        <div className="mt-1">
          <span className="text-xs sm:text-[12px] text-gray-600 line-clamp-2">
            {coupon.description}
          </span>
        </div>

        {/* Footer: Expiry Date and Action Button */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs sm:text-[12px] text-gray-600">
            HSD: {coupon.endDate}
          </span>
          <button
            onClick={onToggle}
            className="cursor-pointer text-xs sm:text-[13px] text-[#1230B0] font-medium hover:underline px-1 py-1"
          >
            {removable
              ? t("PRODUCT.remove")
              : isSelected
              ? t("PRODUCT.remove")
              : t("PRODUCT.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

