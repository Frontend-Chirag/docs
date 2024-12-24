import React, { useState } from 'react';
import { Link2Icon } from 'lucide-react';

import { useEditorStore } from '@/store/useEditorStore';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CustomToolTip } from '../CustomToolTip';




export const LinkButton = () => {

    const { editor } = useEditorStore();

    const [value, setValue] = useState(editor?.getAttributes("link").href || "");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                    className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80'
                >
                    <CustomToolTip label='link'>
                        <Link2Icon className='size-4' />
                    </CustomToolTip>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
                <Input
                    placeholder='https://example.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Add
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
