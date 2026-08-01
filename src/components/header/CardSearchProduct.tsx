import { i18nText } from "@/lib/i18nText";
import Badge from "@/components/ui/Badge";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { calcDiscountPercentage, getMarketPrice, getPrice } from "@/lib/utils";
import { Gift, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardSearchProductProps {
  product: IProduct;
}

const CardSearchProduct: React.FC<CardSearchProductProps> = ({ product }) => {
  const discount =
    product.marketPrice !== undefined
      ? calcDiscountPercentage(product.price, product.marketPrice)
      : 0;

  return (
    <Link href={`/${product.url}`} className="group block">
      <div className="flex items-start gap-3 px-4 py-3 transition-colors duration-200 hover:bg-muted/50">
        <div className="relative flex-shrink-0">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted/20">
            <Image
              width={64}
              height={64}
              src={product.picture}
              alt={product.name}
              className="h-full w-full object-contain p-1 transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div
            className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-background ${
              product.isInStock ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />

          {discount > 0 && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <Badge variant="danger" size="xs" className="px-2 py-0.5">
                -{discount}%
              </Badge>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-grow">
          {product.brand && (
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {product.brand}
            </div>
          )}

          <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-tight text-foreground">
            {product.name}
          </h3>

          {product.rating ? (
            <div className="mb-2 flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(product.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!)
                        ? "fill-current text-[#ffb716]"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          ) : null}

          <div className="mb-1 flex items-center gap-2">
            <span className="text-base font-semibold text-foreground">
              {getPrice(product)}
            </span>

            {getMarketPrice(product) && (
              <s className="text-xs text-muted-foreground">
                {getMarketPrice(product)}
              </s>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                product.isInStock
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {product.isInStock ? i18nText("AUTO.components.header.cardsearchproduct.line99_0_con_hang") : i18nText("AUTO.components.header.cardsearchproduct.line99_1_het_hang")}
            </span>

            {discount > 0 && (
              <span className="inline-flex items-center gap-1">
                <Gift className="h-3 w-3" />{i18nText("AUTO.components.header.cardsearchproduct.line105_2_uu_dai_gia")}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardSearchProduct;

