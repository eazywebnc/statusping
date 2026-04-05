"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110",
        secondary:
          "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600",
        outline:
          "border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60",
        ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
        destructive:
          "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
        link: "text-cyan-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
