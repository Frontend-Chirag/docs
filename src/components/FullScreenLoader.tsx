import Image from 'next/image'
import React from 'react'


interface FullScreenLoader {
    label?: string
}

export const FullScreenLoader = ({ label }: FullScreenLoader) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center'>
                <Image
                    src='/logo.svg'
                    alt='logo'
                    width={96}
                    height={96}
                    className='animate-pulse transition duration-600 mb-6'
                />
                <p className='text-neutral-500 font-medium text-lg'>{label}</p>
            </div>
        </div>
    )
}
