import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/useEditorStore';

import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent
} from '../ui/dropdown-menu';


export const FontFamilyButton = () => {

    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Georgia", value: "Georgia" },
        { label: "Courier New", value: "Courier New" },
        { label: "Helvetica", value: "Helvetica" },
        { label: "Tahoma", value: "Tahoma" },
        { label: "Garamond", value: "Garamond" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
        { label: "Impact", value: "Impact" },
        { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
        { label: "Lucida Sans", value: "Lucida Sans" },
        { label: "Lucida Console", value: "Lucida Console" },
        { label: "Lucida Grande", value: "Lucida Grande" },
        { label: "Palatino", value: "Palatino" },
        { label: "Book Antiqua", value: "Book Antiqua" },
        { label: "Bookman", value: "Bookman" },
        { label: "Comic Sans MS", value: "Comic Sans MS" },
        { label: "FreeMono", value: "FreeMono" },
        { label: "FreeSans", value: "FreeSans" },
        { label: "FreeSerif", value: "FreeSerif" },
        { label: "Symbol", value: "Symbol" },
        { label: "ZapfDingbats", value: "ZapfDingbats" },
        { label: "Verdana", value: "Verdana" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className='truncate'>
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 max-h-60 overflow-auto'>
                {fonts.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80"
                            , editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                        style={{ fontFamily: value }}
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
