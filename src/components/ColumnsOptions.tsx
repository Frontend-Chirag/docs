
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";

import { MenubarItem } from "./ui/menubar";



export const ColumnsOptions = () => {

    const columns = Array.from({ length: 10 }, (_, i) => i);

    const { editor } = useEditorStore();


    const createColumns = (columnCount: number) => {
        if (!editor) return;

        editor.chain().focus().insertContent({
            type: 'columnLayout',
            content: Array.from({ length: columnCount }, () => ({
                type: 'columnBlock',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Add your content here...',
                            },
                        ],
                    },
                ],
            })),
        }).run();
    };


    const isActive = (columnCount: number) => {
        if (!editor) return false;

        const layoutActive = editor.isActive('columnLayout');
        if (!layoutActive) return false;

        // Count the active columns
        const currentColumnCount = editor.state.selection.$anchor.node(1).childCount;
        return currentColumnCount === columnCount;
    };


    return (
        <div className='flex gap-x-2'>
            <MenubarItem
                onClick={() => createColumns(1)}
                className={cn('border-2 hover:border-neutral-400 border-neutral-200', isActive(1) && 'border-neutral-400')}>
                <div className='w-[60px] h-[60px] flex flex-col gap-y-1 justify-center items-center '>
                    {columns.map((i) => (
                        <div key={i} className='w-full h-[2px] bg-neutral-400' />
                    ))}
                </div>
            </MenubarItem>
            <MenubarItem
                onClick={() => createColumns(2)}
                className={cn('border-2 hover:border-neutral-400 border-neutral-200', isActive(2) && 'border-neutral-400')}>
                <div className='w-[60px] h-[60px] flex gap-x-1 justify-center items-center '>
                    <div className='w-1/2 h-full flex flex-col gap-y-1 justify-center items-center'>
                        {columns.map((i) => (
                            <div key={i} className='w-full h-[2px] bg-neutral-400' />
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col gap-y-1 justify-center items-center'>
                        {columns.map((i) => (
                            <div key={i} className='w-full h-[2px] bg-neutral-400' />
                        ))}
                    </div>
                </div>
            </MenubarItem>
            <MenubarItem
                onClick={() => createColumns(3)}
                className={cn('border-2 hover:border-neutral-400 border-neutral-200', isActive(3) && 'border-neutral-400')}>
                <div className='w-[60px] h-[60px] flex gap-x-1 justify-center items-center '>
                    <div className='w-1/2 h-full flex flex-col gap-y-1 justify-center items-center'>
                        {columns.map((i) => (
                            <div key={i} className='w-full h-[2px] bg-neutral-400' />
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col gap-y-1 justify-center items-center'>
                        {columns.map((i) => (
                            <div key={i} className='w-full h-[2px] bg-neutral-400' />
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col gap-y-1 justify-center items-center'>
                        {columns.map((i) => (
                            <div key={i} className='w-full h-[2px] bg-neutral-400' />
                        ))}
                    </div>
                </div>
            </MenubarItem>
        </div>
    )
}