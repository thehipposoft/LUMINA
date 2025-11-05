'use client'
import React, {useState} from 'react'
import Image from 'next/image'

const InvestorsVideo = () => {
  return (
        <div className="max-w-screen flex flex-col justify-center min-h-[630px] relative bg-brand-primary-transp backdrop-blur-3xl">
            <div className="w-[85vw] mx-auto flex flex-col md:flex-row relative z-10">
                <div className=" flex gap-4 relative z-10 ">
                    <div className="relative w-10 z-10">
                        <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" fill className="object-contain" />
                    </div>
                    <div className="bg-white/60 blur-3xl rounded-full absolute w-[500px] h-[300px] -left-12 top-0" />
                    <div className="relative z-10">
                        <div className="title text-black-text overflow-hidden  font-bold text-5xl">
                            <h1 className="">FUTURE</h1>
                        </div>
                        <div className="title text-black-text overflow-hidden  font-bold text-5xl ">
                            <h1 className="">FORWARD</h1>
                        </div>
                        <div className="title text-black-text overflow-hidden  font-bold text-5xl">
                            <h1 className="">INNOVATION</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 cursor-pointer lg:pl-44">
                    <div /* onClick={toggleModal} */ className="bg-white/30 rounded-full w-20 h-20 flex justify-center items-center">
                        <div className="bg-white rounded-full flex justify-center items-center w-12 h-12">
                            <Image src={'/images/vectors/play.svg'} width={25} height={25} alt="Play vector" />
                        </div>
                    </div>
                    <h4 /* onClick={toggleModal} */ className="cursor-pointer uppercase hover:underline text-white font-semibold tracking-widest text-sm">watch video</h4>
                </div>
            </div>
        </div>
  )
}

export default InvestorsVideo
