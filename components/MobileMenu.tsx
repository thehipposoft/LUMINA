'use client'
import Link from 'next/link';
import React, {useState} from 'react'
import Image from 'next/image';

interface MobileMenuTypes {
    openMenu: boolean,
    handleOpenMenu: () => void,
}

const navigationSecondary = [
    { href: "/", label: "Home" },
    { href: "/what-we-do", label: "What we do" },
    { href: "/benefits", label: "Benefits" },
    { href: "/lab", label: "LuminaLab" },
    { href: "/faqs", label: "FAQS" },
    { href: "/#contact", label: "Contact" },
];

const MobileMenu = ({openMenu, handleOpenMenu}:MobileMenuTypes) => {

  return (
    <div className={`md:hidden ${openMenu ? "translate-x-0" : "translate-x-full"} z-10 duration-500 h-screen w-screen fixed left-0 top-0
    bg-black/90 backdrop-blur-3xl flex flex-col justify-center items-center`}>
        <ul className='flex flex-col gap-5 text-white'>
            {
                navigationSecondary.map((item, index) => (
                        <Link
                            onClick={handleOpenMenu}
                            href={item.href}
                            key={index}
                            className='text-3xl font-light uppercase'
                        >
                            {item.label}
                        </Link>
                ))
            }
        </ul>
        <Image src={'/images/vectors/shape4.svg'} alt='Shape of Lumina logo' width={450} height={230} className='absolute bottom-6 w-3/4' />
    </div>
  )
}

export default MobileMenu
