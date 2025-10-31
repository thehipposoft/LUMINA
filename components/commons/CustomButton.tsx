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
    <div className='flex flex-col gap-10'>
        <div className='relative flex justify-center items-center max-w-40 group'>
            {/* <div className=' bg-brand-primary/80 rounded-full w-28 h-7 top-0 blur-lg absolute' /> */}
            <div className=' bg-gradient-to-r group-hover:blur-sm duration-500 from-brand-primary to-brand-purple rounded-full w-32 h-8 top-0 blur-md absolute' />
            <Link
                href={href}
                className={` flex justify-center w-32 bg-brand-primary/75 border-brand-primary/5 border group-hover:border-brand-primary/20 group-hover:bg-white/10  duration-500 backdrop-blur-2xl
                text-white py-3 overflow-hidden rounded-full relative
                    transition-colors`}
            >
                <p className='relative z-10 tracking-normal  group-hover:tracking-wider duration-500'>Discover</p>
            </Link>
        </div>
        <div className='relative flex justify-center items-center max-w-40 group'>
            <div className='duration-500 bg-brand-purple rounded-full w-full h-full top-0 left-0 blur-sm absolute' />
            <Link
                href={href}
                className={` flex justify-center w-32 bg-brand-primary/45 hover:bg-white/10 backdrop-blur-lg duration-500
                text-white py-3 overflow-hidden rounded-full relative
                    transition-colors`}
            >
                <p className='relative z-10 tracking-normal  group-hover:tracking-wider duration-500'>Discover</p>
            </Link>
        </div>
        <div className='relative flex justify-center items-center max-w-40 group'>
            <div className='duration-500 bg-brand-primary  rounded-full w-full blur-[2px] h-full top-0 left-0 absolute' />
            <Link
                href={href}
                className={` flex justify-center w-32 bg-white/5 hover:bg-white/15 border-brand-primary/20 hover:border-brand-primary/50 border backdrop-blur-lg duration-500
                text-white py-3 overflow-hidden rounded-full relative shadow-md
                    transition-colors`}
            >
                <p className='relative z-10 tracking-normal  group-hover:tracking-wider duration-500'>Discover</p>
            </Link>
        </div>
    </div>

  )
}

export default CustomButton
