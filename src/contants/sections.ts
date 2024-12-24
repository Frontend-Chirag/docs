
import { useRouter } from "next/navigation";
import {
    ArrowLeftIcon,
    BoldIcon,
    CodeSquare,
    ItalicIcon,
    ListChecksIcon,
    ListIcon,
    ListOrderedIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    PrinterIcon,
    QuoteIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon
} from 'lucide-react';

import { useEditorStore } from "@/store/useEditorStore";


export const useToolbarSections = () => {

    const { editor } = useEditorStore();
    const router = useRouter();


    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Goback",
                    icon: ArrowLeftIcon,
                    onClick: () => router.push('/')
                },
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                },
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run()
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run()
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run()
                }
            ],
            [
                {
                    label: "Bullet List",
                    icon: ListIcon,
                    isActive: editor?.isActive("bulletList"),
                    onClick: () => editor?.chain().focus().toggleBulletList().run()
                },
                {
                    label: "Ordered List",
                    icon: ListOrderedIcon,
                    isActive: editor?.isActive("orderedList"),
                    onClick: () => editor?.chain().focus().toggleOrderedList().run()
                },
                {
                    label: "Check List",
                    icon: ListChecksIcon,
                    isActive: editor?.isActive('taskList'),
                    onClick: () => editor?.chain().focus().toggleTaskList().run()
                },
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("liveblocksCommentMark")
                },
                {
                    label: "Code Block",
                    icon: CodeSquare,
                    isActive: editor?.isActive("codeBlock"),
                    onClick: () => editor?.chain().focus().toggleCodeBlock().run()
                },
                {
                    label: "Block quote",
                    icon: QuoteIcon,
                    isActive: editor?.isActive("blockquote"),
                    onClick: () => editor?.chain().focus().toggleBlockquote().run()
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().unsetAllMarks().run()
                }
            ]
        ];


    return sections;
}

