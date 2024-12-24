import React from 'react'
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react';

import { Id } from '../../convex/_generated/dataModel';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { RemoveDialog } from './RemoveDialog';
import { RenameDialog } from './RenameDialog';

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'icon'} className='rounded-full focus-visible:ring-0 '>
                    <MoreVertical className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <RenameDialog
                    docId={documentId}
                    initialTitle={title}
                >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FilePenIcon className='size-4 mr-2' />
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>
                <RemoveDialog
                    docId={documentId}
                >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <TrashIcon className='size-4 mr-2' />
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem onClick={() => onNewTab(documentId)}>
                    <ExternalLinkIcon className='size-4 mr-2' />
                    Open in a new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
