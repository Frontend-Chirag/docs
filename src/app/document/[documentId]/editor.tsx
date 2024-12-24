"use client";

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';
import ImageResize from 'tiptap-extension-resize-image';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { FontSizeExtension } from '@/extensions/font-size';
import { lineHeightExtension } from '@/extensions/line-height';
import { CodeBlockExtension } from '@/extensions/code-block';
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { ColumnBlock, ColumnLayout } from '@/extensions/columns';


import { useEditorStore } from '@/store/useEditorStore';
import { Ruler } from './ruler';

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from '@/liveblock/threads';
import { useStorage } from '@liveblocks/react/suspense';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/contants/margins';
import { ContentItemMenu } from '@/components/ContentItemMenu';
import { TemplateNode } from '@/extensions/template-wrapper';


interface EditorProps {
    initialContent: string | undefined
};


export const Editor = ({ initialContent }: EditorProps) => {

    const liveBlocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental: true
    });
    const { setEditor } = useEditorStore();
    const leftMargin = useStorage((root) => root.leftMargin);
    const rightMargin = useStorage((root) => root.rightMargin);

    const editor = useEditor({
        extensions: [
            TemplateNode,
            Superscript,
            Subscript,
            HorizontalRule,
            ColumnBlock,
            ColumnLayout,
            liveBlocks,
            StarterKit.configure({
                history: false
            }),
            TaskList,
            Underline,
            Table.configure({
                resizable: true
            }),
            FontFamily,
            FontSizeExtension,
            TextStyle,
            Color,
            CodeBlockExtension,
            lineHeightExtension.configure({
                types: ['heading', 'paragraph'],
                defaultLineHeight: "normal"
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https"
            }),
            Highlight.configure({
                multicolor: true
            }),
            TableCell,
            TableHeader,
            TableRow,
            Image,
            ImageResize,
            TaskItem.configure({
                nested: true,
            }),
        ],
        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor);
        },

        onSelectionUpdate({ editor }) {
            setEditor(editor)
        },
        onTransaction({ editor }) {
            setEditor(editor)
        },
        onFocus({ editor }) {
            setEditor(editor)
        },
        onBlur({ editor }) {
            setEditor(editor);
        },
        onContentError({ editor }) {
            setEditor(editor)
        },
        editorProps: {
            attributes: {
                style: `padding-left: ${leftMargin ?? LEFT_MARGIN_DEFAULT}px; padding-right: ${rightMargin ?? RIGHT_MARGIN_DEFAULT}px`,
                class: 'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[816px] w-[816px] pt-10 pb-10 pr-14 cursor-text'
            }
        },
        immediatelyRender: false,
    });

    if (!editor) return;

    
    return (
        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <Ruler />
            <div className='min-w-max flex justify-center w-[816px]  py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
                <ContentItemMenu editor={editor} />
                <EditorContent editor={editor} />

                <Threads
                    editor={editor}
                />
            </div>
        </div>
    )
};
