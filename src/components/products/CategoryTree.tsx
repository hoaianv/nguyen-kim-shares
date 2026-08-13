"use client";

import React, { KeyboardEvent, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { IMenu } from "@/interfaces/models/IMenu.interface";
import Link from "next/link";

type CategoryTreeProps = { categories: IMenu[] };
type CategoryItemProps = { category: IMenu; level: number };

const INDENT = 14;

const CategoryItem: React.FC<CategoryItemProps> = ({ category, level }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = !!(category.children && category.children.length);

  const toggle = () => hasChildren && setOpen((v) => !v);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!hasChildren) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  return (
    <div aria-level={level + 1} aria-expanded={hasChildren ? open : undefined}>
      <div
        className="flex items-center bg-white gap-3 border-b border-border px-3 py-3 transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20"
        style={{ paddingLeft: 12 + level * INDENT }}
        onClick={toggle}
        onKeyDown={onKey}
        tabIndex={0}
      >
        <span className="flex h-5 w-5 items-center justify-center text-muted-foreground">
          {hasChildren ? (
            open ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <div>

              <span className="inline-block h-1 w-1 bg-black rounded-full" />
            </div>
          )}
        </span>

        {category.picture ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background rounded-md">
            <Image
              width={40}
              height={40}
              src={category.picture}
              alt={category.title}
              className="h-8 w-8 object-contain"
            />
          </span>
        ) : null}

        <Link
          href={`/${category.url}`}
          className="min-w-0 flex-1 text-sm font-medium text-foreground transition hover:text-amber-800"
          title={category.title}
        >
          <span className="line-clamp-1">{category.title}</span>
        </Link>
      </div>

      {hasChildren && open && (
        <div className="">
          {(category.children ?? []).map((child) => (
            <CategoryItem key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories }) => {
  return (
    <div className="overflow-hidden bg-background" role="tree">
      {(categories ?? []).map((item) => (
        <CategoryItem key={item.id} category={item} level={0} />
      ))}
    </div>
  );
};

export default CategoryTree;
