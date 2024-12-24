import React from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'

interface CustomToolTipProps {
    children: React.ReactNode;
    label: string;
}

export const CustomToolTip = ({ children, label }: CustomToolTipProps) => {
    return (
        <TooltipProvider delayDuration={0} >
            <Tooltip >
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent >
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
