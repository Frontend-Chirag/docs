"use client";

import React from 'react';
import { ArrowUpFromLineIcon, Code2Icon, ImageIcon, Link2Icon, MinusIcon, Table2Icon } from 'lucide-react'

import { codeBlockTemplates } from '@/contants/template';
import { useEditorStore } from '@/store/useEditorStore';

import { MenubarMenu, MenubarTrigger, MenubarContent, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarItem } from '../ui/menubar'
import { Separator } from '../ui/separator';

export const Insert = () => {

    const { editor } = useEditorStore();

    const insertTable = ({ rows, cols }: { rows: number, cols: number }) => {
        editor?.
            chain().
            focus().
            insertTable({ rows, cols, withHeaderRow: false })
            .run();
    };

    const insertCodeBlock = ({ lang, template }: { lang: string; template: string; }) => {
        console.log(lang)
        editor?.
            chain().
            focus().
            insertContent({
                type: 'codeBlock',
                attrs: { language: lang },
                content: [
                    {
                        type: 'text',
                        text: template
                    }
                ]
            }).
            run();
    };

    const onInsertHorizontalRule = () => {
        editor?.chain().focus().setHorizontalRule().run();
    }

    return (
        <MenubarMenu>
            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
                Insert
            </MenubarTrigger>
            <MenubarContent className='w-[250px]'>
                <MenubarSub>
                    <MenubarSubTrigger>
                        <ImageIcon className='icon' /> Image
                    </MenubarSubTrigger>
                    <MenubarSubContent className='W-[220px]'>
                        <MenubarItem>
                            <ArrowUpFromLineIcon className='icon' /> Upload from computer
                        </MenubarItem>
                        <MenubarItem>
                            <Link2Icon className='icon' /> By URL
                        </MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                    <MenubarSubTrigger>
                        <Table2Icon className='size-4 mr-2' />  Table
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                            1 x 1
                        </MenubarItem>
                        <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                            2 x 2
                        </MenubarItem>
                        <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                            3 x 3
                        </MenubarItem>
                        <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                            4 x 4
                        </MenubarItem>

                    </MenubarSubContent>
                </MenubarSub>
                <MenubarItem onClick={onInsertHorizontalRule}>
                    <MinusIcon className='icon' />  Horizontal line
                </MenubarItem>
                <MenubarSub>
                    <MenubarSubTrigger>
                        <Code2Icon className='size-4 mr-2' />  Code block
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        {codeBlockTemplates.map(({ label, value, template }) => (
                            <MenubarItem key={label} onClick={() => insertCodeBlock({ lang: value, template })}>
                                {label}
                            </MenubarItem>
                        ))}
                    </MenubarSubContent>
                </MenubarSub>
                <Separator orientation='horizontal' className='bg-neutral-300 my-2' />
                <MenubarItem>
                    <Link2Icon className='icon' />  Link
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
