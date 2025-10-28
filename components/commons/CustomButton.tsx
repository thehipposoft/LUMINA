'use client'
import Link from 'next/link'
import React from 'react'

interface ButtonTypes {
    href: string,
    text: string,
    customClass?: string
}

const CustomButton = ({href, text, customClass}:ButtonTypes) => {
  return (
    <Link
        href={href}
        className={`${customClass} flex w-fit shadow-2xl bg-brand-primary text-white px-7 py-3 overflow-hidden rounded-full relative hover:after:translate-y-0 after:duration-300
         after:absolute after:ease-out after:w-full after:h-full after:left-0 after:top-0 after:rounded-full after:translate-y-full after:bg-brand-purple transition-colors`}
    >
        <p className='relative z-10'>{text}</p>
    </Link>
  )
}

export default CustomButton
