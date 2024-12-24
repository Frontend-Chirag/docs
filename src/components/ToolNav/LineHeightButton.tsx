import React from 'react';
import { ListCollapseIcon } from "lucide-react";

import { useEditorStore } from '@/store/useEditorStore';
import { cn } from '@/lib/utils';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { CustomToolTip } from '../CustomToolTip';
import { lineHeights } from '@/contants/lineheight';




export const LineHeightButton = () => {

    const { editor } = useEditorStore();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80'
                >
                    <CustomToolTip label='lineheight'>
                        <ListCollapseIcon className='size-4' />
                    </CustomToolTip>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {lineHeights.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={cn(
                            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80")
                        }
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
