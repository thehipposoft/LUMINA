'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Boxes = () => {
    const container = useRef(null);

    useGSAP(() => {

    }, {scope: container})


  return (
        <section ref={container} className="py-10 lg:py-20 grid grid-cols-1 md:place-items-center lg:grid-cols-3 gap-4 w-[85vw] xl:max-w-7xl mx-auto">
            <div className="group md:w-[390px] lg:h-[380px] h-[320px] bg-brand-primary hover:bg-brand-primary/85 duration-500 rounded-3xl flex flex-col relative">
                <Image src={'/images/what-we-do/tile1.png'} alt="Fondo 1" fill className="object-cover z-10 rounded-3xl" />
                <div className="p-8 flex flex-col lg:gap-12 gap-4 relative z-20">
                    <h4 className="uppercase text-3xl text-white font-bold">
                        partnerships
                    </h4>
                    <p className="text-sm text-white">
                        Partnering with major technologuy corporations to make the vision a reality
                    </p>
                </div>
                <Image src={'/images/what-we-do/shape.svg'} alt="V Shape" width={390} height={180} className="absolute bottom-0 scale-105 z-20 group-hover:translate-y-8 group-hover:scale-y-95 origin-bottom duration-700" />
            </div>
            <div className="group md:w-[390px] lg:h-[380px] h-[320px] bg-brand-purple hover:bg-brand-purple/85 duration-300 rounded-3xl flex flex-col relative">
                <Image src={'/images/what-we-do/tile2.png'} alt="Fondo 2" fill className="object-cover z-10 rounded-3xl" />
                <div className="p-8 flex flex-col lg:gap-12 gap-4 relative z-20">
                    <h4 className="uppercase text-3xl text-white font-bold">
                        consulting
                    </h4>
                    <p className="text-sm text-white w-5/6">
                        Corporate contracting for consulting solutions
                    </p>
                </div>
                <Image src={'/images/what-we-do/shape.svg'} alt="V Shape" width={390} height={180} className="absolute bottom-0 scale-105 z-20 group-hover:translate-y-8 group-hover:scale-y-95 origin-bottom duration-700" />
            </div>
            <div className="group md:w-[390px] lg:h-[380px] h-[320px] bg-brand-turquoise hover:bg-brand-turquoise/85 duration-300 rounded-3xl flex flex-col relative">
                <Image src={'/images/what-we-do/tile3.png'} alt="Fondo 3" fill className="object-cover z-10 rounded-3xl" />
                <div className="p-8 flex flex-col lg:gap-8 gap-4 relative z-20">
                    <h4 className="uppercase text-3xl text-white font-bold">
                        INDEPENDENT
                        RESEARCH
                    </h4>
                    <p className="text-sm text-white ">
                        Have a problem that needs assistance from a trained professionals?
                    </p>
                </div>
                <Image src={'/images/what-we-do/shape.svg'} alt="V Shape" width={390} height={180} className="absolute bottom-0 scale-105 z-20 group-hover:translate-y-8 group-hover:scale-y-95 origin-bottom duration-700" />
            </div>
        </section>
  )
}

export default Boxes
