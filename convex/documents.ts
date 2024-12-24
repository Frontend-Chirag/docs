import { mutation, query } from './_generated/server';
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from 'convex/server';

// CREATE NEW DOCUMENT
export const createDocument = mutation({
    args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized")
        };

        const organizationId = (user.organization_id ?? undefined) as string | undefined;


        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled document",
            ownerId: user.subject,
            organizationId,
            initialContent: args.initialContent
        });

        return documentId;
    }
});

// GET ALL THE DOCUMENTS
export const getDocument = query({
    args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
    handler: async (ctx, { paginationOpts, search }) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized")
        };

        const organizationId = (user.organization_id ?? undefined) as string | undefined;

        // Search docs within organization 
        if (search && organizationId) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) => {
                    return q.search("title", search).eq("organizationId", organizationId)
                })
                .paginate(paginationOpts)
        }

        // Personal search docs
        if (search) {
            return await ctx.db.query('documents')
                .withSearchIndex("search_title", (q) => {
                    return q.search("title", search).eq("ownerId", user.subject)
                }).paginate(paginationOpts)
        };

        // All organization docs
        if (organizationId) {
            return await ctx.db
                .query("documents")
                .withIndex("by_oranization_id", (q) => q.eq("organizationId", organizationId))
                .paginate(paginationOpts)
        };

        // All personal search
        return await ctx.db.query('documents')
            .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
            .paginate(paginationOpts);
    }
});

// DELETE DOCUMENT
export const deleteDocument = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        };

        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        };

        const organizationId = (user.organization_id ?? undefined) as string | undefined;
        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);


        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        };

        await ctx.db.delete(args.id);
    }
});

// UPDATE DOCUMENT
export const updateDocument = mutation({
    args: { id: v.id("documents"), title: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        };

        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        };

        const organizationId = (user.organization_id ?? undefined) as string | undefined;
        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId)

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        };

        return await ctx.db.patch(args.id, { title: args.title });
    }
});


// GET DOCUMENT BY ID
export const getDocById = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        };

        return document;
    },
});

export const getDocumentByIds = query({
    args: { ids: v.array(v.id("documents")) },
    handler: async (ctx, { ids }) => {
        const documents = [];
        for (const id of ids) {
            const document = await ctx.db.get(id);

            if (document) {
                documents.push({ id: document._id, name: document.title });
            }else {
                documents.push({id, name: "[This room has been deleted]"})
            }
        };

        return documents;
    }
})