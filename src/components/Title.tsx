import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface TitleProps {
    label: string;
}

export const Title = ({
    label
}: TitleProps) => {
    return(
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-3xl font-semibold text-blue-700 drop-shadow-md",
                font.className
            )}>
               skilledUp
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}