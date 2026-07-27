import { PhoneCall, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

const ButtonCard = ({
  onClick,
  text,
  icon,
  isInStock,
}: {
  onClick?: () => void;
  text?: string;
  icon?: React.ReactNode;
  isInStock: boolean;
}) => {
  const t = useTranslations();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
        isInStock
          ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
          : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
      } md:px-4 md:py-2.5 md:text-sm`}
    >
      {isInStock ? icon ?? <ShoppingCart size={16} /> : <PhoneCall size={16} />}
      <span className="whitespace-nowrap">
        {isInStock ? t("COMMON.add_to_cart") : t("COMMON.contact")} {text}
      </span>
    </button>
  );
};

export default ButtonCard;

