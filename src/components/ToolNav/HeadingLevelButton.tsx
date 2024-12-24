import React from 'react'
import { ChevronDownIcon } from 'lucide-react';
import { type Level } from '@tiptap/extension-heading';


import { useEditorStore } from '@/store/useEditorStore';
import { cn } from '@/lib/utils';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { headings } from '@/contants/headings';




export const HeadingLevelButton = () => {

    const { editor } = useEditorStore();

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        };
        return "Normal text";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className='truncate'>
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col p-1 gap-y-1'>
                {headings.map(({ label, value , icon: Icon}) => (
                    <button
                        key={value}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            value === 0 && !editor?.isActive("heading") || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                        )}
                    >
                       <Icon className='size-4 mr-1'/> {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
