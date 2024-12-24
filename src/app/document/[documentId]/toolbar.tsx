"use client";

import React from 'react';

import { cn } from '@/lib/utils';

import { AlignButton } from '@/components/ToolNav/AlignButton';
import { FontFamilyButton } from '@/components/ToolNav/FontFamilyButton';
import { FontSizeButton } from '@/components/ToolNav/FontSizeButton';
import { HeadingLevelButton } from '@/components/ToolNav/HeadingLevelButton';
import { HighLightColorButton } from '@/components/ToolNav/HighLightColorButton';
import { ImageButton } from '@/components/ToolNav/ImageButton';
import { LineHeightButton } from '@/components/ToolNav/LineHeightButton';
import { LinkButton } from '@/components/ToolNav/LinkButton';
import { TextColorButton } from '@/components/ToolNav/TextColorButton';
import { Separator } from '@/components/ui/separator';
import { CustomToolTip } from '@/components/CustomToolTip';
import { useToolbarSections } from '@/contants/sections';
import { LucideIcon } from 'lucide-react';


interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    label: string;
};

const ToolbarButton = ({ onClick, isActive, icon: Icon, label }: ToolbarButtonProps) => {

    return (
        <CustomToolTip label={label}>
            <button
                onClick={onClick}
                className={cn(
                    "text-sm h-7 min-w-7  flex items-center justify-center outline-none border-none rounded-sm hover:bg-neutral-200/80",
                    isActive && "bg-neutral-200/80"
                )}
            >
                <Icon className='size-4' />
            </button>
        </CustomToolTip>
    )
};

export const Toolbar = () => {

    const sections = useToolbarSections();


    return (
        <div className='bg-[#F1F4F9] px-8 py-0.5 rounded-[24px] min-h-[48px] flex items-center gap-x-1.5 overflow-x-auto'>
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <FontFamilyButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <HeadingLevelButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <FontSizeButton />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighLightColorButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            <LineHeightButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            {sections[3].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    )
}
