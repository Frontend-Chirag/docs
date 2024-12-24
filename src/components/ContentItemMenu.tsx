"use client";

import { useData } from '@/hooks/use-data';
import { Editor } from '@tiptap/react';
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CopyIcon, GripIcon, RemoveFormattingIcon, Trash2Icon } from 'lucide-react';
import { IoDuplicateSharp } from 'react-icons/io5';
import { Button } from './ui/button';
import { useContentItemActions } from '@/hooks/use-content-item-actions';
import DragHandle from '@tiptap-pro/extension-drag-handle-react'

interface ContentItemMenuProps {
    editor: Editor;
}

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {

    const [menu, setMenu] = useState(false);
    const data = useData();
    const { copyNodeToClipboard, deleteNode, duplicateNode, resetTextFormatting } = useContentItemActions({ editor, currentNode: data.currentNode, currentNodePos: data.currentNodePos });


    useEffect(() => {

        if (menu) {
            editor.commands.setMeta('lockDragHandle', true);
        } else {
            editor.commands.setMeta('lockDragHandle', false);

        }
    }, [editor, menu])

    const onCopy = () => {
        copyNodeToClipboard();
        setMenu(false);
    };

    const onDuplicate = () => {
        duplicateNode();
        setMenu(false);
    };

    const onReset = () => {
        resetTextFormatting();
        setMenu(false);
    };

    const onDelete = () => {
        deleteNode();
        setMenu(false);
    }

    return (
        <DragHandle
            pluginKey="ContentItemMenu"
            editor={editor}
            onNodeChange={data.handleNodeChange}
            tippyOptions={{
                offset: [-2, 16],
                zIndex: 99,
            }}
        >
            <Popover open={menu} onOpenChange={setMenu}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size={'icon'} className='flex p-1 cursor-grab'>
                        <GripIcon className='size-4' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='p-1 w-fit flex flex-col gap-y-1 max-h-60 overflow-auto'>
                    <button
                        onClick={onReset}
                        className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm"
                    >
                        <RemoveFormattingIcon className='icon' /> Clear formatting
                    </button>
                    <button

                        onClick={onCopy}
                        className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm"
                    >
                        <CopyIcon className='icon' /> Copy to Clipboard
                    </button>
                    <button

                        onClick={onDuplicate}
                        className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm"
                    >
                        <IoDuplicateSharp className='icon' /> Duplicate
                    </button>
                    <button

                        onClick={onDelete}
                        className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm"
                    >
                        <Trash2Icon className='icon' /> Delete
                    </button>
                </PopoverContent>
            </Popover>
        </DragHandle>
    )
}
