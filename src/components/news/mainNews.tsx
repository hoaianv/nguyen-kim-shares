import NewsCard from "@/components/news/NewsCard";
import { INews } from "@/interfaces/models/INews.interface";

export default function MainNews({ data }: { data: INews[] }) {
  const first = (data ?? []).slice(0, 2).filter(Boolean);
  const next = (data ?? []).slice(2, 5).filter(Boolean);

  return (
    <div>
      {/* Hàng đầu: 2 bài */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {first.map((item, i) => (
          <NewsCard
            key={item.id ?? `first-${i}`}
            item={item}
            sizes="(min-width:1024px) 50vw, 100vw"
            priority={i === 0} // chỉ ưu tiên ảnh đầu để tối ưu LCP
          />
        ))}
      </div>

      {/* Hàng sau: 3 bài */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        {next.map((item, i) => (
          <NewsCard
            key={item.id ?? `next-${i}`}
            item={item}
            sizes="(min-width:1024px) 33vw, 100vw"
          />
        ))}
      </div>
    </div>
  );
}
