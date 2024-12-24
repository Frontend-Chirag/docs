"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';

import { api } from '../../convex/_generated/api';
import { templates } from '@/contants/template';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';



export const TemplatesGallery = () => {

    const router = useRouter();
    const createDoc = useMutation(api.documents.createDocument);

    const [isCreating, setIsCreating] = useState(false);


    const onTemplateClick = (title: string, initialContent: string) => {
        setIsCreating(true);
        createDoc({ title, initialContent })
            .then((documentId) => {
                router.push(`/document/${documentId}`);
                toast.success("New Document created successfully");
            })
            .catch(() => {
                toast.error("Somethng went wrong");
            })
            .finally(() => {
                setIsCreating(false);
            })
    };


    return (
        <div className='bg-[#F1F3F4]'>
            <div className='max-w-screen-xl mx-auto px-20 py-6 flex flex-col gap-y-4 border'>
                <h3 className='font-medium'>Start a new document</h3>
                <Carousel className='border'>
                    <CarouselContent className='-ml-4'>
                        {templates.map((template) => (
                            <CarouselItem
                                key={template.id}
                                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5 2xl:basis-[14.285714%] pl-4'
                            >
                                <div
                                    className={cn(
                                        'aspect-[3/4] flex flex-col gap-y-2.5',
                                        isCreating && "pointer-events-none opacity-50"
                                    )}
                                >
                                    <button
                                        disabled={isCreating}
                                        onClick={() => onTemplateClick(template.label, template.initialContent)}
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        className='size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white'
                                    />
                                    <p className='text-sm font-medium truncate'>
                                        {template.label}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext  />
                    <CarouselPrevious />
                </Carousel>
            </div>
        </div>
    )
}
