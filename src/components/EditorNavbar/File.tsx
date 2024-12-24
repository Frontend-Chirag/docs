"use client";

import React from 'react';
import {
    ArrowDownToLineIcon,
    FileJsonIcon,
    FilePenIcon,
    FilePlusIcon,
    FileTextIcon,
    GlobeIcon,
    PrinterCheckIcon,
    TrashIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BsFilePdf } from 'react-icons/bs';

import { Doc } from '../../../convex/_generated/dataModel';
import { useEditorStore } from '@/store/useEditorStore';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';

import { RenameDialog } from '../RenameDialog';
import { RemoveDialog } from '../RemoveDialog';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '../ui/menubar'

interface FileNavProps {
    data: Doc<"documents">
}

export const FileNav = ({ data }: FileNavProps) => {

    const { editor } = useEditorStore();

    const router = useRouter();
    const mutation = useMutation(api.documents.createDocument);


    const onNewDocument = () => {
        mutation({
            title: "Untitled document",
            initialContent: ""
        })
            .then((id) => {
                router.push(`/document/${id}`);
                toast.success("New Document Created")
            })
            .catch(() => {
                toast.error("Something went wrong!")
            });
    };

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    };

    const onSaveJSON = () => {
        if (!editor) return;

        const content = editor?.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type: 'application/json'
        });

        onDownload(blob, `${data.title}.json`)
    };

    const onSaveHTML = () => {
        if (!editor) return;

        const content = editor?.getHTML();
        const blob = new Blob([JSON.stringify(content)], {
            type: 'text/html'
        });

        onDownload(blob, `${data.title}.html`)
    };

    const onSaveTEXT = () => {
        if (!editor) return;

        const content = editor?.getText();
        const blob = new Blob([JSON.stringify(content)], {
            type: 'text/plain'
        });

        onDownload(blob, `${data.title}.txt`)
    };

    const onSavePDF = async () => {
        if (editor) {
            try {
                const content = editor?.getHTML();
                const response = await fetch('/api/generate-pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ htmlContent: content, Filename: data.title , id: data._id})
                });

                if (!response.ok) {
                    throw new Error('Failed to generate PDF');
                };

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${data.title}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading PDF:', error);
            }
        }
    };

    return (
        <MenubarMenu>
            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
                File
            </MenubarTrigger>
            <MenubarContent className='print:hidden w-[250px]'>
                <MenubarSub>
                    <MenubarSubTrigger>
                        <FilePlusIcon className='icon' /> New
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        <MenubarItem onClick={onNewDocument}>
                            <Image
                                src='/logo.svg'
                                alt='doc'
                                width={16}
                                height={16}
                                className='icon'
                            />
                            Document
                        </MenubarItem>
                        <MenubarItem asChild>
                            <Link href={'/'} target='_blank'>
                                <FileTextIcon className='icon' /> From template gallery
                            </Link>
                        </MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                    <MenubarSubTrigger>
                        <ArrowDownToLineIcon className='icon' />
                        Download
                    </MenubarSubTrigger>
                    <MenubarSubContent className='w-[220px]'>
                        <MenubarItem onClick={onSaveJSON}>
                            <FileJsonIcon className='size-4 mr-2' />
                            JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML}>
                            <GlobeIcon className='size-4 mr-2' />
                            HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => onSavePDF()}>
                            <BsFilePdf className='size-4 mr-2' />
                            PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveTEXT}>
                            <FileTextIcon className='size-4 mr-2' />
                            Text
                        </MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <RenameDialog docId={data._id} initialTitle={data.title}>
                    <MenubarItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                    >
                        <FilePenIcon className='size-4 mr-2' />
                        Rename
                    </MenubarItem>
                </RenameDialog>
                <RemoveDialog docId={data._id}>
                    <MenubarItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                    >
                        <TrashIcon className='size-4 mr-2' />
                        Move to bin
                    </MenubarItem>
                </RemoveDialog>
                <MenubarSeparator />
                <MenubarItem onClick={() => window.print()}>
                    <PrinterCheckIcon className='size-4 mr-2' />
                    Print <MenubarShortcut>CTRL P</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
