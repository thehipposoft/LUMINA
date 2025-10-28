import React from 'react'
import Image from 'next/image'

const Boxes = () => {
  return (
            <section className=" py-10 grid grid-cols-1 lg:grid-cols-3 gap-4 w-[85vw] mx-auto">
            <div className="w-[390px] h-[380px] bg-[#174FF6] rounded-3xl flex flex-col relative">
                <Image src={'/images/what-we-do/tile1.png'} alt="Fondo 1" fill className="object-cover z-10 rounded-3xl" />
                <div className="p-8 flex flex-col gap-12 relative z-20">
                    <h4 className="uppercase text-3xl text-white font-bold">
                        partnerships
                    </h4>
                    <p className="text-sm text-white">
                        Partnering with major technologuy corporations to make the vision a reality
                    </p>
                </div>
                <Image src={'/images/what-we-do/shape.svg'} alt="V Shape" width={390} height={180} className="absolute bottom-0 scale-105 z-20" />
            </div>
            <div className="w-[390px] h-[380px] bg-[#9747FF] rounded-3xl flex flex-col relative">
                <Image src={'/images/what-we-do/tile2.png'} alt="Fondo 2" fill className="object-cover z-10 rounded-3xl" />
                <div className="p-8 flex flex-col gap-12 relative z-20">
                    <h4 className="uppercase text-3xl text-white font-bold">
                        consulting
                    </h4>
                    <p className="text-sm text-white w-5/6">
                        Corporate contracting for consulting solutions
                    </p>
                </div>
                <Image src={'/images/what-we-do/shape.svg'} alt="V Shape" width={390} height={180} className="absolute bottom-0 scale-105 z-20" />
            </div>
            <div className="w-[390px] h-[380px] bg-[#35E3ED] rounded-3xl flex flex-col relative">
                <Image src={'/images/what-we-do/tile3.png'} alt="Fondo 3" fill className="object-cover z-10 rounded-3xl" />
                <div className="p-8 flex flex-col gap-8 relative z-20">
                    <h4 className="uppercase text-3xl text-white font-bold">
                        INDEPENDENT
                        RESEARCH
                    </h4>
                    <p className="text-sm text-white ">
                        Have a problem that needs assistance from a trained professionals?
                    </p>
                </div>
                <Image src={'/images/what-we-do/shape.svg'} alt="V Shape" width={390} height={180} className="absolute bottom-0 scale-105 z-20" />
            </div>
        </section>
  )
}

export default Boxes
