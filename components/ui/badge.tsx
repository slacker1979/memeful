import * as React from "react";
import { cn } from "./utils";

const badgeVariants = {
  variant: {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive: "border-transparent bg-destructive text-white hover:bg-destructive/90",
    outline: "text-foreground hover:bg-accent hover:text-accent-foreground border-border",
  },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants.variant;
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-colors";
  const variantClass = badgeVariants.variant[variant];

  return (
    <span
      className={cn(baseClasses, variantClass, className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };