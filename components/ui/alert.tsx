import * as React from "react";
import { cn } from "./utils";

const alertVariants = {
  variant: {
    default: "bg-card text-card-foreground",
    destructive: "text-destructive bg-card",
  },
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants.variant;
}

function Alert({
  className,
  variant = "default",
  ...props
}: AlertProps) {
  const baseClasses = "relative w-full rounded-lg border px-4 py-3 text-sm grid gap-y-0.5 items-start";
  const variantClass = alertVariants.variant[variant];

  return (
    <div
      role="alert"
      className={cn(baseClasses, variantClass, className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-muted-foreground text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };