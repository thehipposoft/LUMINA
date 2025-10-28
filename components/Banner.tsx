import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
        <section className="py-4 lg:w-[1400px] max-h-[750px] mx-auto relative">
{/*             <svg width="1390" height="909" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1360 0c16.57 0 30 13.4315 30 30v676.225c0 16.568-13.43 30-30 30H857c-16.569 0-30 13.431-30 30V879c0 16.569-13.431 30-30 30H30c-16.5685 0-30-13.431-30-30V30C.0000147 13.4315 13.4315 0 30 0h1330Z" fill="#fff"/>
            </svg> */}
            <div
                className='flex relative justify-center polygon h-screen mx-auto items-center rounded-4xl '
            >
                <video
                    src="https://res.cloudinary.com/hipposoft/video/upload/v1761002442/abstract-background-waves-2025-08-29-12-37-20-utc_doc68u.mp4"
                    loop
                    muted
                    autoPlay
                    className='absolute top-0  left-0 w-full h-full object-cover rounded-4xl'
                >

                </video>
                <div className="relative  z-20 flex items-center justify-center min-h-screen px-6 pointer-events-none">
                    <div className="text-center max-w-4xl">
                        <h1
                            className="text-5xl md:text-5xl font-medium text-white"
                        >
                            A <span className="font-black">REVOLUTION</span> in OLED technology.
                        </h1>
                    </div>
                </div>
            </div>
                <div className="absolute right-0 bottom-0 h-32 w-[500px] bg-white rounded-tl-4xl p-6 flex justify-center items-center z-30">
                    <div className='flex gap-4 items-center justify-center'>
                        <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" width={30} height={40} className="object-contain" />
                        <h3 className="font-bold text-gray-900">
                            Intelligent molecular synthesis
                        </h3>
                    </div>
                </div>
        </section>
  )
}

export default Banner
