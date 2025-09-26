import * as React from "react"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        config: Record<string, any>
    }
>(({ className, config, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
    />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-background p-2 shadow-md",
            className
        )}
        {...props}
    />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltipContent }

export type ChartConfig = Record<string, any>
