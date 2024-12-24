"use client";

import React, { useState } from 'react';
import { useMutation } from 'convex/react';

import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from './ui/alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


interface RemoveDialogProps {
    docId: Id<"documents">;
    children: React.ReactNode;
};



export const RemoveDialog = ({ docId, children }: RemoveDialogProps) => {

    const deleteDoc = useMutation(api.documents.deleteDocument);
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteDoc = (e: React.MouseEvent<HTMLButtonElement>, id: Id<"documents">) => {
        e.stopPropagation();
        setIsDeleting(true);
        deleteDoc({ id })
            .then(() => {
              toast.success("Document deleted successfully");
              router.push('/')
            })
            .catch(() => {
                toast.error("Something went wrong")
            })
            .finally(() => setIsDeleting(false))
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure</AlertDialogTitle>
                    <AlertDialogDescription>
                        This acton cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isDeleting}
                        onClick={(e) => handleDeleteDoc(e, docId)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
