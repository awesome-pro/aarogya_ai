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
        <div className="w-full flex flex-col gap-y-4 items-center justify-center mt-8">
            <h1 className={cn(
                "text-3xl font-semibold text-blue-700 drop-shadow-md",
                font.className
            )}>
               Aarogya AI
            </h1>
            <p className="text-xl bg-blue-200 p-2 font-semibold text-blue-700 w-full items-center justify-center flex" >
                {label}
            </p>
        </div>
    )
}