'use client'
import Link from 'next/link'
import React from 'react'

interface ButtonTypes {
    href: string,
    text?: string,
    customClass?: string
}

const CustomButton = ({href}:ButtonTypes) => {
  return (
        <div className='relative flex justify-center items-center max-w-32 group'>
            <div className='duration-300 bg-brand-turquoise rounded-full w-full h-full top-0 left-0 blur-sm absolute' />
            <Link
                href={href}
                className={`flex group justify-center w-32 bg-brand-primary/75 hover:bg-white/10 backdrop-blur-lg duration-300 text-white py-3 overflow-hidden rounded-full relative shadow-sm transition-colors`}
            >
                <p className='relative z-10 tracking-normal group-hover:tracking-wider duration-500'>Discover</p>
            </Link>
        </div>
  )
}

export default CustomButton
