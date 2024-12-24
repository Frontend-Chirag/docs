import React from 'react'
import { type ColorResult, SketchPicker } from 'react-color';

import { useEditorStore } from '@/store/useEditorStore';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { PencilIcon } from 'lucide-react';



export const HighLightColorButton = () => {

    const { editor } = useEditorStore();

    const value = editor?.getAttributes("highlight").color || '#FF0000';

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80'
                >
                    <PencilIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
