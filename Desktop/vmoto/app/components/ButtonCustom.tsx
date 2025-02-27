import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100",
  {
    variants: {
      variant: {
        default: "bg-cyan-300 text-black hover:bg-cyan-400",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300/10",
      },
      size: {
        default: "h-14 px-4 lg:px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
      },
      skew: {
        default: "skew-x-[-12deg]",
        reverse: "skew-x-[12deg]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      skew: "default",
    },
  }
);

export interface SkewedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  unskewText?: boolean;
}

const SkewedButton = React.forwardRef<HTMLButtonElement, SkewedButtonProps>(
  ({ className, variant, size, skew, children, unskewText = true, href, ...props }, ref) => {
    const Comp = href ? "a" : "button";
    const textSkew = unskewText
      ? skew === "default"
        ? "skew-x-[12deg]"
        : skew === "reverse"
        ? "skew-x-[-12deg]"
        : ""
      : "";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, skew, className }))}
        ref={ref as any}
        {...(href ? { href } : {})}
        {...props}
      >
        <div className={`${textSkew} flex items-center gap-2`}>{children}</div>
      </Comp>
    );
  }
);
SkewedButton.displayName = "SkewedButton";

export { SkewedButton, buttonVariants };
