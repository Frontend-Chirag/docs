import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

import {Menubar} from '../ui/menubar';
import { DocumentInput } from '../DocumentInput';
import { Avatars } from '../Avatar';
import { Inbox } from '../Indox';
import { Doc } from '../../../convex/_generated/dataModel';
import { Format } from './Format';
import { Insert } from './Insert';
import { Edit } from './Edit';
import { FileNav } from './File';


interface EditorNavBarProps {
    data: Doc<"documents">
}



export const EditorNavBar = ({ data }: EditorNavBarProps) => {


    return (
        <nav className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Link href='/'>
                    <Image
                        src='/logo.svg'
                        alt='Logo'
                        width={35}
                        height={36}
                    />
                </Link>
                <div className='flex flex-col'>
                    <DocumentInput title={data.title} id={data._id} />
                    <div className='flex'>
                        <Menubar className='border-none shadow-none h-auto p-0 bg-transparent'>
                            {/* FILE TOOLS */}
                            <FileNav data={data} />
                            {/* EDIT TOOLS */}
                            <Edit />
                            {/* INSERT TOOLS */}
                            <Insert />
                            {/* FORMAT TOOLS */}
                            <Format />
                        </Menubar>
                    </div>
                </div>

            </div>
            <div className='flex gap-4 items-center pl-6'>
                <Inbox />
                <Avatars />
                <UserButton />
            </div>
        </nav>
    )
}
