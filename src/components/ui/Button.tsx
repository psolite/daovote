import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-laila",
  {
    variants: {
      variant: {
        default: "bg-primary rounded-[120px] font-bold hover:bg-primary/90 shadow",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "bg-transparent border-[2px] font-semibold border-white rounded-[20px] text-white hover:bg-primary/30 shadow",
        secondary:
          "bg-white rounded-[10px] text-[15px] font-semibold leading-[22.5px] text-primary hover:bg-white/70",
        vote:
          "bg-primary rounded-[15px] hover:bg-primary/70",
        ghost: "text-white/80 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[32px] w-[138px] font-bold text-[15px] leading-[22.5px] text-white",
        md: "h-[42px] w-[139px] font-bold text-[20px] leading-[24px] ",
        sm: "h-[35px] w-[113.3px] text-[13px] leading-[17.6px] text-white",
        xs: "h-[21.2px] w-[91.6px] text-[12px] leading-[16.2px] text-white",
        lg: "h-[68px] w-[283px] font-semibold text-[20px] leading-[30px] text-white",
        full: "h-[42px]",
        vote: "h-[46px] w-[166px] text-[20px] font-semibold leading-[30px] text-white",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
