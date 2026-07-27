import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  description,
  actionLabel,
  actionHref,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-3 flex items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <div className="nk-section-title text-xl font-semibold text-slate-950 sm:text-2xl">
          {title}
        </div>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
        )}
      </div>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="nk-focus-ring shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

