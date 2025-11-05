'use client'
import React, {useState, useRef} from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FAQS = [
    {
        question: "What are Lumina’s materials used for?",
        answer: "Our proprietary monolayers enhance the performance of OLED and organic semiconductor devices by improving adhesion, charge injection, and interface stability. These molecular coatings are engineered to interface organic and inorganic layers precisely at the nanoscale. ⟶ Clarifies core function"
    },
    {
        question: "Which technologies benefit from Lumina’s solutions?",
        answer: "Our proprietary monolayers enhance the performance of OLED and organic semiconductor devices by improving adhesion, charge injection, and interface stability. These molecular coatings are engineered to interface organic and inorganic layers precisely at the nanoscale. ⟶ Clarifies core function"
    },
    {
        question: "How do Lumina’s monolayers work?",
        answer: "Our proprietary monolayers enhance the performance of OLED and organic semiconductor devices by improving adhesion, charge injection, and interface stability. These molecular coatings are engineered to interface organic and inorganic layers precisely at the nanoscale. ⟶ Clarifies core function"
    },
    {
        question: "Can we license or collaborate on your technology",
        answer: "Our proprietary monolayers enhance the performance of OLED and organic semiconductor devices by improving adhesion, charge injection, and interface stability. These molecular coatings are engineered to interface organic and inorganic layers precisely at the nanoscale. ⟶ Clarifies core function"
    },
]

const Faqs = () => {

    const [currentIndex, setCurrentIndex] = useState<number>();

    const container = useRef(null)

    const handleIndex = (index:number) => {
        if (index === currentIndex) {
            setCurrentIndex(undefined);
        } else {
            setCurrentIndex(index);
        }
    }

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from(".content", {
            opacity: 0,
            delay: 0.5,
            ease: "power2.InOut",
        })
        tl.from(".faqs > *", {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            ease: "power2.InOut",
        })
    }, {scope: container})

  return (
    <div ref={container} className='flex lg:flex-row flex-col max-w-[85vw] mx-auto min-h-[650px] lg:pt-16 pt-28'>
        <div className='content flex flex-col justify-between lg:w-1/2 relative gap-6 lg:gap-0'>
            <div className='flex flex-col gap-6'>
                <h1 className='font-semibold text-5xl'>FAQs</h1>
                <p className='text-grey-text leading-7'>Our Frequently Asked Questions section is designed to clarify technical aspects of Lumina’s advanced molecular surface solutions. Browse these answers to understand how our tailor-made monolayers optimize OLED interfaces, improve device efficiency, and enable seamless integration in next-gen display technologies.</p>
            </div>
            <Image src={'/images/vectors/shape4.svg'} alt='Shape of Lumina logo' width={550} height={230} className='' />
        </div>
        <div className='faqs flex flex-col lg:w-1/2 pb-16 pt-12 lg:pt-0'>
            {
                FAQS.map((val, index) => (
                    <div onClick={() => handleIndex(index)} key={index} className='flex flex-col cursor-pointer first:border-t border-b px-5 py-4 gap-4 hover:bg-brand-primary/5  overflow-hidden min-h-12'>
                        <div className='flex items-center gap-4'>
                            <h4 className='font-semibold text-2xl'>{val.question}</h4>
                            <div className='flex justify-center items-center relative'>
                                <div className='bg-black w-6 rounded-full h-1 '/>
                                <div className={`${currentIndex === index ? "rotate-0" : "rotate-90"} bg-black w-6 rounded-full h-1 absolute duration-300`}/>
                            </div>
                        </div>
                        <p className={`${currentIndex === index ? "lg:max-h-36 max-h-52" : "-translate-y-full max-h-0 opacity-0"} duration-500 text-grey-text`}>{val.answer}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Faqs
