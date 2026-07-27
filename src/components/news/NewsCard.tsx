import { INews } from "@/interfaces/models/INews.interface";
import Image from "next/image";
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

type CardProps = {
  item: INews;
  sizes: string;
  priority?: boolean;
};

function NewsCard({ item, sizes, priority = false }: CardProps) {
  return (
    <Link href={item.slug}>
      <figure
        className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-muted/20 transition-all duration-300 hover:-translate-y-0.5"
        style={{ aspectRatio: "16 / 10" }}
      >
        <ImageWithFallback
          src={item?.picture || ""}
          alt={item?.title || "Hình ảnh"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={sizes}
          quality={90}
          priority={priority}
        />

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
          <div className="relative p-3">
            <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-white drop-shadow">
              {item?.title}
            </h2>

            <div className="mt-1 flex items-center gap-2">
              {item?.categoryName && (
                <span className="pointer-events-auto inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow">
                  {item.categoryName}
                </span>
              )}
              {item?.createdAt && (
                <span className="text-sm text-white/85 drop-shadow">
                  {item.createdAt}
                </span>
              )}
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

export default NewsCard;

