"use client";

import React from 'react';

import { Redo2Icon, Undo2Icon } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';

import { MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from '../ui/menubar'

export const Edit = () => {

    const { editor } = useEditorStore();



    return (
        <MenubarMenu>
            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
                Edit
            </MenubarTrigger>
            <MenubarContent className='w-[250px]'>
                <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo  <MenubarShortcut>CTRL Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className='size-4 mr-2' />
                    Redo  <MenubarShortcut>CTRL Y</MenubarShortcut>
                </MenubarItem>

            </MenubarContent>
        </MenubarMenu>
    )
}
