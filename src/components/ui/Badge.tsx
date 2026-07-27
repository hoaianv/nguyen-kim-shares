import { LucideIcon } from "lucide-react";
import { ReactNode, HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  className?: string;
}

const Badge = ({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-chip)] font-medium";

  const variants: Record<BadgeVariant, string> = {
    default: "border border-border bg-muted/50 text-foreground",
    primary: "border border-amber-200 bg-amber-50 text-amber-700",
    secondary: "border border-border bg-background text-foreground",
    success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border border-orange-200 bg-orange-50 text-orange-700",
    danger: "border border-rose-200 bg-rose-50 text-rose-700",
    info: "border border-sky-200 bg-sky-50 text-sky-700",
  };

  const sizes: Record<BadgeSize, string> = {
    xs: "px-2 py-0.5 text-[11px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes: Record<BadgeSize, string> = {
    xs: "h-3 w-3",
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-4 w-4",
  };

  const badgeClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  return (
    <span className={badgeClasses} {...props}>
      {Icon && <Icon className={iconSizes[size]} />}
      {children}
    </span>
  );
};

export default Badge;
