"use client";

import React from 'react'
import { AlignCenterIcon, BoldIcon, Columns2Icon, ItalicIcon, LucideIcon, PlusIcon, RemoveFormattingIcon, Rows4Icon, StrikethroughIcon, Subscript, Superscript, Table2Icon, TableCellsMergeIcon, TextIcon, TrashIcon, UnderlineIcon } from 'lucide-react'

import { MenubarContent, MenubarMenu, MenubarShortcut, MenubarSub, MenubarItem, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '../ui/menubar'
import { Separator } from '../ui/separator';
import { ColumnsOptions } from '../ColumnsOptions';

import { useEditorStore } from '@/store/useEditorStore';
import { lineHeights } from '@/contants/lineheight';
import { alignments } from '@/contants/alignments';
import { headings } from '@/contants/headings';

import { useToolbarSections } from '@/contants/sections';
import { Level } from '@tiptap/extension-heading';
import { cn } from '@/lib/utils';




export const Format = () => {

    const { editor } = useEditorStore();
    const sections = useToolbarSections();

    const tableOptions: {
        label: string;
        icon?: LucideIcon;
        onClick?: () => void;
        isSeparator?: boolean;
    }[] = [
            {
                label: 'Insert title row',
                onClick: () => editor?.chain().focus().toggleHeaderRow().run()
            },
            { label: 'Separator', isSeparator: true },
            {
                label: 'Insert row above',
                icon: PlusIcon,
                onClick: () => editor?.chain().focus().addRowBefore().run()
            },
            {
                label: 'Insert row below',
                icon: PlusIcon,
                onClick: () => editor?.chain().focus().addRowAfter().run()
            },
            {
                label: 'Insert column above',
                icon: PlusIcon,
                onClick: () => editor?.chain().focus().addColumnBefore().run()
            },
            {
                label: 'Insert column below',
                icon: PlusIcon,
                onClick: () => editor?.chain().focus().addColumnAfter().run()
            },
            { label: 'Separator1', isSeparator: true },
            {
                label: 'Delete Row',
                icon: TrashIcon,
                onClick: () => editor?.chain().focus().deleteRow().run()
            },
            {
                label: 'Delete Column',
                icon: TrashIcon,
                onClick: () => editor?.chain().focus().deleteColumn().run()
            },
            {
                label: 'Delete Table',
                icon: TrashIcon,
                onClick: () => editor?.chain().focus().deleteTable().run()
            },
            { label: 'Separator2', isSeparator: true },
            {
                label: 'Merge Cells',
                icon: TableCellsMergeIcon,
                onClick: () => editor?.chain().focus().mergeCells().run()
            },
            {
                label: 'Unmerge Cells',
                icon: TableCellsMergeIcon,
                onClick: () => editor?.chain().focus().splitCell().run()
            },
        ];


    const onFormatHeadings = (value: number) => {
        if (value === 0) {
            editor?.chain().focus().setParagraph().run();
        } else {
            editor?.chain().focus().toggleHeading({ level: value as Level }).run()
        }
    };

    const onFormatAligments = (value: string) => {
        editor?.chain().focus().setTextAlign(value).run()
    };

    const onFormatLineHeight = (value: string) => {
        editor?.chain().focus().setLineHeight(value).run()
    }



    return (
        <MenubarMenu>
            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
                Format
            </MenubarTrigger>
            <MenubarContent className='w-[250px]'>
                <MenubarSub>
                    <MenubarSubTrigger>
                        <TextIcon className='size-4 mr-2' />
                        Text
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                            <BoldIcon className='size-4 mr-2' />
                            Bold  <MenubarShortcut>CTRL B</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                            <ItalicIcon className='size-4 mr-2' />
                            Italic <MenubarShortcut>CTRL I</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                            <UnderlineIcon className='size-4 mr-2' />
                            underline <MenubarShortcut>CTRL U</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                            <StrikethroughIcon className='size-4 mr-2' />
                            Strinkthrough  &nbsp;&nbsp;<MenubarShortcut>CTRL S</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleSubscript().run()}>
                            <Subscript className='size-4 mr-2' />
                            Subscript &nbsp;&nbsp;<MenubarShortcut>CTRL ,</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleSuperscript().run()}>
                            <Superscript className='size-4 mr-2' />
                            Superscript &nbsp;&nbsp;<MenubarShortcut>CTRL .</MenubarShortcut>
                        </MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSub >
                    <MenubarSubTrigger className="disabled:text-gray-300">
                        <Rows4Icon className='size-4 mr-2' /> Paragraph styles
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        {headings.map(({ label, icon: Icon, value }) => {
                            return (
                                <MenubarItem
                                    key={label} onClick={() => onFormatHeadings(value)}>
                                    <Icon className='size-4 mr-2' />
                                    {label}
                                </MenubarItem>
                            )
                        })}
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSub >
                    <MenubarSubTrigger className="disabled:text-gray-300">
                        <AlignCenterIcon className='size-4 mr-2' /> Align
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        {alignments.map(({ label, icon: Icon, value }) => {
                            return (
                                <MenubarItem
                                    key={label} onClick={() => onFormatAligments(value)}>
                                    <Icon className='size-4 mr-2' />
                                    {label}
                                </MenubarItem>
                            )
                        })}
                    </MenubarSubContent>
                </MenubarSub>

                <MenubarSub >
                    <MenubarSubTrigger className="disabled:text-gray-300">
                        <AlignCenterIcon className='size-4 mr-2' /> Line height
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        {lineHeights.map(({ label, value }) => {
                            return (
                                <MenubarItem
                                    key={label} onClick={() => onFormatLineHeight(value)}>
                                    {label}
                                </MenubarItem>
                            )
                        })}
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSub >
                    <MenubarSubTrigger>
                        <AlignCenterIcon className='size-4 mr-2' /> Bullets and Numbering
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        {sections[2].map(({ label, icon: Icon, onClick, isActive }) => {
                            return (
                                <MenubarItem
                                    key={label}
                                    onClick={() => onClick()}
                                    className={cn(isActive && 'bg-neutral-200')}
                                >
                                    <Icon className='size-4 mr-2' /> {label}
                                </MenubarItem>
                            )
                        })}
                    </MenubarSubContent>
                </MenubarSub>

                <Separator orientation='horizontal' className='bg-neutral-300 my-2' />
                <MenubarSub>
                    <MenubarSubTrigger>
                        <Columns2Icon className='icon' /> Columns
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                        <ColumnsOptions />
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSub >
                    <MenubarSubTrigger
                        disabled={!editor?.isActive("table")}
                        className={cn(!editor?.isActive("table") && "text-gray-400")}
                    >
                        <Table2Icon className='size-4 mr-2' />  Table
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        {tableOptions.map(({ label, onClick, isSeparator, icon: Icon }) => {
                            if (isSeparator) {
                                return (
                                    <Separator key={label} orientation='horizontal' className="bg-neutral-300 my-2" />
                                )
                            }
                            return (
                                <MenubarItem
                                    key={label}
                                    onClick={() => onClick?.()}
                                >
                                    {Icon && <Icon className='icon' />}
                                    {label}
                                </MenubarItem>
                            )
                        })}
                    </MenubarSubContent>
                </MenubarSub>
                <Separator orientation='horizontal' className='bg-neutral-300 my-2' />
                <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <RemoveFormattingIcon className='size-4 mr-2' />
                    Clear formatting
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
