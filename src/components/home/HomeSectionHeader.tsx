import Link from "next/link";

type HomeSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  tone?: "light" | "dark" | "retail";
};

export default function HomeSectionHeader({
  title,
  actionLabel,
  actionHref,
  className = "",
  tone = "retail",
}: HomeSectionHeaderProps) {
  const retail = tone === "retail";

  if (retail) {
    return (
      <div
        className={`flex items-center   justify-between gap-3 pr-3 pb-3  sm:pr-4 sm:pb-4   ${className}`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={[
              "relative inline-flex h-10 items-center bg-[#ffb716] pl-4 pr-5 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-950 sm:h-11 sm:text-base",
              "after:absolute after:right-[-18px] after:top-0 after:h-full after:w-0 after:border-y-[22px] after:border-y-transparent after:border-l-[18px] after:border-l-[#ffb716] sm:after:border-y-[22px] sm:after:border-l-[18px]",
            ].join(" ")}
          >
            {title}
          </div>
        </div>

        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 transition hover:text-[#c69208] sm:text-sm"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    );
  }

  const textClass = tone === "dark" ? "text-background" : "text-foreground";

  const actionClass =
    tone === "dark"
      ? "border-background/30 bg-background/10 text-background hover:bg-background/20"
      : "border-border bg-background text-foreground hover:border-[#ffb716] hover:bg-[#fff7da]";

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <h2 className={`mt-1 text-2xl font-bold sm:text-3xl ${textClass}`}>
            {title}
          </h2>
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
