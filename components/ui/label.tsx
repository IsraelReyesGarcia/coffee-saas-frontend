"use client"

import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import { cn } from "cn"

const labelVariant = cva(
  "flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants:{
      size:{
        sm:"text-xs",
        default:"text-sm",
        lg:"text-base"
      },
    },
    defaultVariants:{size:"default"}
  }
)


function Label({ className, size, ...props }: React.ComponentProps<"label"> & VariantProps<typeof labelVariant>) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariant({size}), className)}
      {...props}
    />
  )
}

export { Label }
