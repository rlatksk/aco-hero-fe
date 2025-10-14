import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-[#30363d] bg-[#21262d] text-foreground [a&]:hover:bg-[#30363d]",
        secondary:
          "border-[#30363d] bg-[#161b22] text-[#8b949e] [a&]:hover:bg-[#21262d]",
        destructive:
          "border-[#da3633]/50 bg-[#da3633]/10 text-[#ff7b72] [a&]:hover:bg-[#da3633]/20",
        outline:
          "border-[#30363d] text-foreground [a&]:hover:bg-[#21262d]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
