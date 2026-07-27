"use client";

import { ICategory } from "@/interfaces/models/ICategories.interface";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CategoryProps = {
  data: ICategory[];
};

export const Category = ({ data }: CategoryProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data?.length > 0 &&
        data.map((item) => (
          <div
            key={item.id}
            className="border-l border-border pl-4 first:border-l-0 first:pl-0"
          >
            <Link
              className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-[#e6a414]"
              href={`/${item.url}`}
            >
              {item.title}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="mt-3 space-y-2">
              {item?.children?.map((child) => (
                <Link
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  key={child.id}
                  href={`/${child.url}`}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

Category.displayName = "Category";
