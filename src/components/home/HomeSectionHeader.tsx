import { ChevronRight } from "lucide-react";
import Link from "next/link";

type HomeSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  tone?: "light" | "dark" | "retail";
  divider?: boolean;
};

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  className = "",
  tone = "retail",
}: HomeSectionHeaderProps) {
  const retail = tone === "retail";

  if (retail) {
    return (
      <div
        className={`flex min-h-[48px] flex-col gap-2 rounded-t-md bg-[#ffb716] px-4 py-3 text-slate-950 sm:flex-row sm:items-center sm:justify-between ${className}`}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 line-clamp-1 text-xs text-slate-800/78 sm:text-sm">
              {description}
            </p>
          ) : null}
        </div>

        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded bg-white px-3 text-sm font-bold text-slate-950 transition hover:bg-[#fff7da] hover:text-slate-950"
          >
            {actionLabel}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    );
  }

  const textClass = tone === "dark" ? "text-background" : "text-foreground";
  const mutedClass =
    tone === "dark" ? "text-background/72" : "text-muted-foreground";
  const actionClass =
    tone === "dark"
      ? "border-background/30 bg-background/10 text-background hover:bg-background/20"
      : "border-border bg-background text-foreground hover:border-[#ffb716] hover:bg-[#fff7da]";

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          {eyebrow ? (
            <p className={`text-[11px] uppercase tracking-[0.18em] ${mutedClass}`}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className={`mt-1 text-2xl font-bold sm:text-3xl ${textClass}`}>
            {title}
          </h2>
          {description ? (
            <p className={`mt-2 max-w-2xl text-sm leading-6 ${mutedClass}`}>
              {description}
            </p>
          ) : null}
        </div>

        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className={`inline-flex h-10 items-center rounded-md border px-4 text-sm font-semibold transition ${actionClass}`}
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
