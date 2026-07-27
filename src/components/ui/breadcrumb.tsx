import Link from "next/link";
import { IBreadcrumb } from "@/interfaces/common";
import { useTranslations } from "next-intl";

interface BreadcrumbProps {
  items: IBreadcrumb[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const t = useTranslations();

  const path = [{ name: t("BREADCRUMB.home"), url: "/" }, ...items];

  return (
    <nav
      className={`flex items-center gap-2 text-base text-gray-600 ${className}`}
    >
      {path.map((item, i) => {
        const isLast = i === path.length - 1;
        return (
          <div
            key={i}
            className={`flex items-center ${
              isLast ? "min-w-0 flex-1" : "shrink-0"
            }`}
          >
            {i > 0 && <span className="mx-2 text-gray-400 shrink-0">/</span>}

            {isLast ? (
              <span
                className="
                  block min-w-0
                  truncate
                  sm:whitespace-normal  line-clamp-1
                "
                title={item.name}
              >
                {item.name}
              </span>
            ) : (
              <Link href={item.url} className="hover:underline">
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
