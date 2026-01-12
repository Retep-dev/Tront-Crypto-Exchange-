import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-sm border border-[#2B3139] bg-[#0B0E11] px-3 py-2 text-sm text-[#EAECEF] ring-offset-[#0B0E11] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#848E9C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F7A600] disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-[#F6465D] focus-visible:ring-[#F6465D]",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <span className="text-xs text-destructive mt-1">{error}</span>}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
