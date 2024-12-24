"use client";

import React from 'react'
import { usePaginatedQuery, } from 'convex/react';

import { api } from '../../../convex/_generated/api';

import { Navbar } from './Navbar';
import { TemplatesGallery } from '@/components/TemplatesGallery';
import { DocumentsTable } from '@/components/DocumentsTable';
import { useSearchParam } from '@/hooks/use-search-params';



const Home = () => {

  const [search] = useSearchParam("search")

  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.getDocument, { search }, { initialNumItems: 5 });

  // if (documents === undefined) {
  //   return (
  //     <div className='min-h-screen flex justify-center items-center'>
  //       <Loader2Icon className='size-16 animate-spin transition duration-600' />
  //     </div>
  //   )
  // }

  return (
    <div className='min-h-screen  flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  )
}

export default Home;