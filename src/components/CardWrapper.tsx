"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Title } from "./Title";
import Social from "./Social";
import BackButton from "./BackButton";
  

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = true

} : CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md  bg-white">
            <CardFooter>
                <Title label={headerLabel}/>
            </CardFooter>
            <CardContent>
                {children}
            </CardContent>
               {showSocial && (
                <CardFooter>
                    <Social>
                        
                    </Social>
                </CardFooter>
               )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href= {backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}