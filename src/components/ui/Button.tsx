import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
// import { Loader2 } from "lucide-react" // Ensure lucide-react is installed

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[#F7A600] text-black hover:bg-[#F7A600]/90 font-bold",
                destructive: "bg-[#F6465D] text-white hover:bg-[#F6465D]/90",
                outline: "border border-[#2B3139] bg-transparent text-[#EAECEF] hover:bg-[#2B3139] hover:border-[#848E9C]",
                secondary: "bg-[#2B3139] text-[#EAECEF] hover:bg-[#474D57]",
                ghost: "hover:bg-[#2B3139] text-[#848E9C] hover:text-[#F7A600]",
                link: "text-[#F7A600] underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-[#F7A600] to-[#E29500] text-black font-bold",
            },
            size: {
                default: "h-10 px-4 py-2 rounded-sm",
                sm: "h-8 rounded-sm px-3 text-xs",
                lg: "h-12 rounded-sm px-8",
                icon: "h-10 w-10 rounded-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading && <span className="mr-2 h-4 w-4 animate-spin">C</span>}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
