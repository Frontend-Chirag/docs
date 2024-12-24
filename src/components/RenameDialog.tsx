"use client";

import React, { useState } from 'react'
import { useMutation } from 'convex/react';

import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface RenameDialogProps {
    docId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode
};



export const RenameDialog = ({ docId, initialTitle, children }: RenameDialogProps) => {

    const updateDoc = useMutation(api.documents.updateDocument);
    const [isUpdating, setIsUpdating] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        updateDoc({ id: docId, title: title.trim() || "Untitled" })
            .then(() => {
                setOpen(false);
                toast.success("Document renamed successfully");
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsUpdating(false);
            })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename document</DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document
                        </DialogDescription>
                    </DialogHeader>
                    <div className='my-4'>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Document title'
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant={'ghost'}
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
