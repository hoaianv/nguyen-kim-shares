import { i18nText } from "@/lib/i18nText";
import { IPromotion } from "@/interfaces/models/IPromotion.interface";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function CardPromotion({ item }: { item: IPromotion }) {
  return (
    <Link href={item.slug}>
      <div
        className="group 
        my-0
        sm:my-3
        lg:my-3
        flex 
        cursor-pointer 
        flex-col 
        overflow-hidden 
        rounded-lg 
        bg-white 
        transition-all 
        duration-300 
        hover:-translate-y-0.5"
      >
        <div
          className="relative 
          w-full 
          aspect-[16/9] 
          overflow-hidden"
        >
          {item.status && (
            <span
              className="absolute 
                left-2 
                top-2 
                z-10 
                rounded-full 
                bg-red-600/90 
                text-white 
                shadow
                px-1.5 
                py-0.5 
                text-xs
                sm:px-2.5 
                sm:py-1 
                sm:text-xs
                font-semibold 
                uppercase 
                tracking-wide"
              aria-label={i18nText("AUTO.components.promotion.cardpromotion.line49_0_da_het_han")}
            >{i18nText("AUTO.components.promotion.cardpromotion.line51_1_het_han")}</span>
          )}

          <Image
            src={item.picture ?? "/placeholder.png"}
            alt={item.title}
            fill
            className={clsx(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              item.status && "grayscale-[30%] contrast-95"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
            priority={false}
          />
        </div>

        <div
          className="flex 
          flex-col 
          gap-1 
          p-2
          sm:p-3"
        >
          <span
            className="line-clamp-2 
            font-semibold 
            text-slate-800 
            transition-colors 
            group-hover:text-blue-600
            text-sm
            sm:text-base
            h-[40px]
            sm:h-[48px]"
          >
            {item.title}
          </span>
          {item?.endDate && (
            <div
              className="mt-1
              sm:mt-2 
              flex 
              items-center 
              gap-2 
              text-gray-500
              text-xs
              sm:text-sm"
            >
              <span>{i18nText("AUTO.components.promotion.cardpromotion.line99_2_den_ngay")}{item.endDate}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

