import { i18nText } from "@/lib/i18nText";
import React from "react";
import Image from "next/image";
import { calcDiscountPercentage, getMarketPrice, getPrice } from "@/lib/utils";
import { ICartItem } from "@/interfaces/models/ICart.interfaces";
import { IBuildPcCategory } from "@/interfaces/models/IBuildPc.interface";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import Button from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface BuildItemProps {
  item: IBuildPcCategory;
  value?: ICartItem | null;
  onIncrease: (itemUrl: string, value: ICartItem) => void;
  onDecrease: (itemUrl: string, value: ICartItem) => void;
  onRemove: (itemUrl: string) => void;
  onOpen: (item: IBuildPcCategory) => void;
}

const BuildItem = React.memo(function BuildItem({
  item,
  value,
  onDecrease,
  onIncrease,
  onRemove,
  onOpen,
}: BuildItemProps) {
  const hasValue = !!value;
  const t = useTranslations();

  // Fallback ảnh an toàn cho next/image
  const imageSrc =
    (hasValue ? value!.picture : item.picture) || "/images/placeholder.png";
  const imageAlt = hasValue ? value!.name : item.title;

  // Guard tính % giảm
  const canCalcDiscount =
    typeof value?.price === "number" &&
    typeof value?.marketPrice === "number" &&
    value.marketPrice > value.price;

  return (
    <div
      className="p-3 
      bg-white 
      border 
      border-[#E0E0E0] 
      my-2 
      rounded-lg
      
      /* Mobile/Tablet: Stack layout */
      flex 
      flex-col 
      gap-3
      
      /* Desktop: Horizontal layout */
      lg:flex-row 
      lg:gap-0"
    >
      {/* Main Content Section */}
      <div
        className="
        /* Mobile/Tablet: Full width, vertical stack */
        w-full
        flex
        flex-col
        gap-3
        
        /* Desktop: 60% width, horizontal */
        lg:w-[60%] 
        lg:flex-row 
        lg:items-center 
        lg:justify-between
        lg:gap-0"
      >
        {/* Category Title */}
        <div
          className="
          /* Mobile/Tablet: Full width */
          w-full
          flex
          justify-center
          lg:justify-start
          
          /* Desktop: Fixed width */
          lg:w-40"
        >
          <span
            className="font-medium 
            line-clamp-1 
            text-center 
            lg:text-left
            text-sm
            sm:text-base"
          >
            {item.title}
          </span>
        </div>

        {/* Image and Product Info Container */}
        <div
          className="
          flex 
          flex-row 
          items-center 
          gap-3
          
          /* Mobile: Centered */
          justify-center
          
          /* Desktop: Normal spacing */
          lg:justify-normal
          lg:gap-4"
        >
          {/* Product Image */}
          <div
            className="
            p-1 
            border 
            border-[#E0E0E0] 
            rounded-lg
            flex-shrink-0
            
            /* Mobile/Tablet: Smaller image */
            w-[60px] 
            h-[60px]
            
            
            lg:w-[80px] 
            lg:h-[80px]"
          >
            <Image
              width={75}
              height={75}
              alt={imageAlt}
              src={imageSrc}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Product Information */}
          <div
            className="
            flex-1
            min-w-0
            
            /* Desktop: Fixed width */
            lg:w-[280px]
            lg:flex-none"
          >
            {hasValue ? (
              <div>
                <span
                  className="
                  font-medium 
                  text-[#333333] 
                  line-clamp-2
                  
                  
                  text-xs
                  sm:text-sm
                  
                  
                  lg:text-sm
                  lg:line-clamp-3"
                >
                  {value?.name}
                </span>
                <span
                  className="
                  block 
                  text-gray-400
                  
                  
                  text-xs
                  
                  
                  lg:text-xs
                  
                  mt-1"
                >
                  {t("COMMON.brand")}: {value?.brand ?? "—"}
                </span>
              </div>
            ) : (
              <span
                className="
                font-light 
                text-[#333333] 
                line-clamp-1
                
                
                text-xs
                sm:text-sm
                
                
                lg:text-sm"
              >
                {t("BUILD_PC.please_select_component")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div
        className="
        /* Mobile/Tablet: Full width, horizontal layout */
        w-full
        flex
        items-center
        justify-between
        gap-2
        
        /* Desktop: 40% width, spaced layout */
        lg:w-[40%] 
        lg:justify-around
        lg:gap-2"
      >
        {/* Quantity Controls */}
        {hasValue ? (
          <div
            className="
            flex 
            flex-col 
            gap-2 
            items-center
            
            /* Mobile: Smaller */
            min-w-fit
            
            
            lg:w-fit"
          >
            {/* Quantity Buttons */}
            <div
              className="inline-flex 
              items-center 
              rounded-lg 
              border 
              border-gray-300"
            >
              <button
                disabled={(value?.quantity ?? 1) <= 1}
                onClick={() => value && onDecrease(item.url, value)}
                className={`
                  text-gray-400
                  
                  /* Mobile: Smaller buttons */
                  h-6 
                  w-6
                  text-sm
                  
                  
                  lg:h-8 
                  lg:w-8
                  
                  ${
                    (value?.quantity ?? 1) <= 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                aria-label={i18nText("AUTO.components.buildpc.builditem.line263_0_giam_so_luong")}
              >
                −
              </button>
              <span
                className="
                text-center 
                
                /* Mobile: Smaller */
                w-8
                text-xs
                
                /* Desktop: Original */
                lg:w-10 
                lg:text-sm"
              >
                {value?.quantity ?? 1}
              </span>
              <button
                onClick={() => value && onIncrease(item.url, value)}
                className="
                  text-gray-400 
                  cursor-pointer
                  
                  /* Mobile: Smaller buttons */
                  h-6 
                  w-6
                  text-sm
                  
                  
                  lg:h-8 
                  lg:w-8"
                aria-label={i18nText("AUTO.components.buildpc.builditem.line295_1_tang_so_luong")}
              >
                +
              </button>
            </div>

            {/* Delete Button */}
            <div className="text-center">
              <ConfirmPopover
                trigger={
                  <span
                    className="
                    text-gray-400 
                    cursor-pointer
                    
                    
                    text-xs
                    
                    /* Desktop: Original with margin */
                    lg:text-xs 
                    lg:mt-2"
                  >
                    {t("COMMON.delete")}
                  </span>
                }
                title={i18nText("AUTO.components.buildpc.builditem.line320_2_xoa_san_pham")}
                description={i18nText("AUTO.components.buildpc.builditem.line321_3_chac_chan_muon_xoa_san")}
                onConfirm={() => onRemove(item.url)}
                position="bottom"
              />
            </div>
          </div>
        ) : (
          <div
            className="
            /* Mobile: Smaller placeholder */
            w-[60px]
            
            
            lg:w-[100px]"
          />
        )}

        {/* Price Section */}
        {hasValue ? (
          <div
            className="
            flex 
            flex-col 
            
            
            w-[90px]
            
            
            lg:w-[120px]"
          >
            <span
              className="
              font-semibold
              
              
              text-sm
              
              
              lg:text-base"
            >
              {value ? getPrice(value) : ""}
            </span>
            <div
              className="flex 
              gap-1 
              items-center 
              flex-wrap"
            >
              {value && getMarketPrice(value) && (
                <s
                  className="
                  text-[#82869E]
                  
                  
                  text-xs
                  
                  
                  lg:text-xs"
                >
                  {getMarketPrice(value)}
                </s>
              )}
              {canCalcDiscount && (
                <span
                  className="
                  text-[#7DD2EB]
                  
                   text-xs
                  
                   lg:text-xs"
                >
                  {-calcDiscountPercentage(value!.price, value!.marketPrice!)}%
                </span>
              )}
            </div>
          </div>
        ) : (
          <div
            className="
             w-[90px]
            
             lg:w-[120px]"
          />
        )}

        {/* Select Button */}
        <div
          className="
           
          
           lg:w-[70px]"
        >
          <Button
            onClick={() => onOpen(item)}
            variant="primary"
            size="sm"
            className="
               mt-0
              px-2
              py-1
              text-xs
              
               lg:mt-3
              lg:px-3
              lg:py-2
              lg:text-sm"
          >
            {t("COMMON.choose")}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default BuildItem;

