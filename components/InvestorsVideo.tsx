'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import VideoModal from './VideoModal'

const InvestorsVideo = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

  return (
        <section className='relative'>
            <div className="max-w-screen flex flex-col justify-center md:min-h-[630px] min-h-[800px] relative bg-brand-primary-transp backdrop-blur-3xl">
                <iframe
                    src="https://player.vimeo.com/video/1140176277?h=5c37d91adf?h=5c37d91adf&background=1"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none', // Sigue siendo útil para que no se pueda hacer clic
                    }}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className='-z-10 w-full h-full'
                />
                <div className="lg:w-[1000px] justify-between md:justify-start h-[550px] md:h-auto mx-auto flex flex-col md:flex-row relative z-10">
                    <div className=" flex gap-4 relative z-10 ">
                        <div className="relative w-10 z-10">
                            <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" fill className="object-contain" />
                        </div>
                        <div className="bg-white/60 blur-3xl rounded-full absolute md:w-[500px] w-[300px] md:h-[300px] h-[200px] -left-12 top-0" />
                        <div className="relative z-10">
                            <div className="title text-black-text overflow-hidden  font-bold text-3xl md:text-5xl">
                                <h1 className="">FUTURE</h1>
                            </div>
                            <div className="title text-black-text overflow-hidden  font-bold text-3xl md:text-5xl ">
                                <h1 className="">FORWARD</h1>
                            </div>
                            <div className="title text-black-text overflow-hidden  font-bold text-3xl md:text-5xl">
                                <h1 className="">INNOVATION</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 lg:pl-20">
                        <div onClick={toggleModal} className="bg-white/30 cursor-pointer group hover:scale-110 duration-500 rounded-full w-20 h-20 flex justify-center items-center">
                            <div className="bg-white rounded-full flex group-hover:scale-110 duration-500 justify-center items-center w-12 h-12">
                                <Image src={'/images/vectors/play.svg'} width={25} height={25} alt="Play vector" />
                            </div>
                        </div>
                        <h4 onClick={toggleModal} className="cursor-pointer uppercase hover:underline text-white font-semibold tracking-widest text-sm">watch video</h4>
                    </div>
                </div>
            </div>
            <VideoModal toggleModal={toggleModal} openModal={openModal} />
        </section>

  )
}

export default InvestorsVideo
