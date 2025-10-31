'use client'
import React, {useState, useRef} from 'react'
import VideoModal from './VideoModal'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const VideoComponent = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
                end: "bottom center",
            },
        })
        tl.from(".animate_one > *", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.05,
            ease: "power3.out",
        });
        tl.from(".animate_two", {
            opacity: 0,
            y: 10,
            duration: 1,
            ease: "power3.out",

        });
    }, {scope: container})

  return (
        <section ref={container} className=" bg-black py-20 fade-in min-h-[585px] relative z-[99]">
            <div className="absolute left-0 top-0 h-full w-full bg-[#151F27]/65" />
            <Image src={'/images/what-we-do/videobg.png'} alt="" fill className="object-cover -scale-x-100 -z-10" />
            <Image src={'/images/vectors/shape3.svg'} alt="" width={220} height={120} className="absolute left-0" />
            <div className="flex justify-between w-[85vw] xl:max-w-7xl mx-auto relative">
                <div className="animate_two w-7/12 flex flex-col justify-center items-center gap-12">
                    <h2 className="text-2xl font-semibold mb-2 text-white">
                        Advanced display technology.
                    </h2>
                    <div className="flex flex-col justify-center items-center gap-4 cursor-pointer">
                        <div onClick={toggleModal} className="bg-white/30 rounded-full w-20 h-20 flex justify-center items-center">
                            <div className="bg-white rounded-full flex justify-center items-center w-12 h-12">
                                <Image src={'/images/vectors/play.svg'} width={25} height={25} alt="Play vector" />
                            </div>
                        </div>
                        <h4 onClick={toggleModal} className="cursor-pointer uppercase hover:underline text-white font-semibold tracking-widest text-sm">watch video</h4>
                    </div>
                </div>
                <div className="animate_one text-white w-[415px] text-justify flex flex-col gap-4 mr-12">
                    <h3 className="text-5xl font-black text-white">
                        How
                    </h3>
                    <h2 className="text-2xl font-semibold mb-2">
                        Designing Solutions
                    </h2>
                    <p className="mb-2 text-sm leading-6">
                        As an industry forerunner in OLED display manufacturing, we constantly seek innovative solutions to enhance brightness, transparency, and energy efficiency.
                    </p>
                    <p className="mb-2 text-sm leading-6">
                        Lumina&apos;s groundbreaking chemical technology has transformed our production process, allowing us to achieve thinner electrodes, brighter displays, and superior transparency—critical for next-generation applications like under-display cameras and AR/VR. Their technical support and expert guidance ensured a seamless integration into our pilot lines, setting the stage for mass production success. Lumina&apos;s solution is not just an upgrade;
                    </p>
                    <p className="font-bold text-sm leading-6">
                        It&apos;s a revolution in OLED performance.
                    </p>
                </div>
            </div>
            <VideoModal toggleModal={toggleModal} openModal={openModal} videoUrl="https://res.cloudinary.com/hipposoft/video/upload/v1761605294/VRAY_3_hapt64.mp4" />
        </section>
  )
}

export default VideoComponent
