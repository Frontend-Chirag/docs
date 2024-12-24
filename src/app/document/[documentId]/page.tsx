import React from 'react';

import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from "convex/nextjs";

import { Document } from './document';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {

    const { documentId } = await params;

    const { getToken } = await auth();
    const token = await getToken({ template: "convex" }) ?? undefined;


    if (!token) {
        throw new Error("Unauthorized");
    };

    const preloadedDocument = await preloadQuery(
        api.documents.getDocById,
        { id: documentId as Id<"documents"> },
        { token }
    ) 

    return <Document preloadedDocument={preloadedDocument} />
};

export default DocumentIdPage;