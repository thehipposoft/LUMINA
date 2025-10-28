import Image from 'next/image'
import React from 'react'

export default function LabPage() {
  return (
    <div>
        <section className='h-[700px] relative'>
            <Image src={'/images/banner.webp'} alt='Glass background' fill className='object-cover' quality={100} />
            <div className='w-[85vw] lg:max-w-7xl mx-auto relative z-10'>
                <div className='flex items-center gap-6 pt-44'>
                    <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" width={35} height={40} className="object-contain" />
                    <div className='flex flex-col w-fit items-end pt-8'>
                        <p className="lg:text-2xl text-xl">
                            We reimagine the interface between <strong>light and matter</strong>
                        </p>
                        <p className="lg:text-2xl text-xl">
                            Lumina <strong>LAB.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className='flex lg:flex-row flex-col gap-12 lg:gap-0 justify-between w-[85vw] lg:max-w-7xl mx-auto lg:py-24 py-12'>
            <div className='lg:w-[520px] flex flex-col gap-2 lg:pt-24'>
                <h2 className='font-bold text-4xl'>LuminaLAB</h2>
                <h4 className='font-semibold text-2xl'>Where Innovation Takes Shape</h4>
                <p className='text-sm leading-6'>Lumina Lab is our experimental playground — where ideas evolve into materials that will define the next wave of optoelectronic devices. From early-stage R&D to prototype-ready solutions, we explore new chemistries and interfaces that push the limits of performance and design.</p>
            </div>
            <div className='lg:w-1/2'>
                <Image
                    src={'/images/lab/lab-1.jpg'}
                    alt='LuminaLab Image 1'
                    width={605}
                    height={550}
                    className='rounded-4xl object-cover lg:h-[550px]'
                />
            </div>
        </section>
        <section className='flex lg:flex-row flex-col-reverse gap-12 lg:gap-0 justify-between w-[85vw] lg:max-w-7xl mx-auto lg:py-24 py-12'>
            <div className='lg:w-1/2'>
                <Image
                    src={'/images/lab/lab-2.png'}
                    alt='LuminaLab Image 1'
                    width={605}
                    height={550}
                    className='rounded-4xl object-cover lg:h-[550px]'
                />
            </div>
            <div className='lg:w-[520px] flex flex-col gap-6 lg:pt-24'>
                <div className='flex gap-6 items-center'>
                    <Image src={'/images/lab/vector.svg'} alt="Lumina Arrow" width={25} height={20} className="object-contain" />
                    <h2 className='font-bold text-4xl'>LUMI-1</h2>
                </div>
                <p className='text-sm leading-6'>Organic semiconductors are an emerging technology that promises to revolutionize electronics and computing, especially in light-emitting diodes. In particular, we are examining prototypical semiconductors (tetracene, anthracene, etc.) which have excellent electronic properties, but whose interfacial structure limits its adoption into modern displays and devices. We have developed a means for chemically reacting the surface via the classic Diels-Alder reaction (via a vapor/surface reaction) and use a variety of surface analysis techniques (XPS, PM-IRRAS, MALDI) to study the reacted surface. Device and materials properties of functionalized acenes are examined to discern their performance improvement.</p>
            </div>
        </section>
        <section className='flex lg:flex-row flex-col gap-12 lg:gap-0 justify-between w-[85vw] lg:max-w-7xl mx-auto lg:py-24 py-12'>
            <div className='lg:w-[520px] flex flex-col gap-6 lg:pt-8'>
                <div className='flex gap-6 items-center'>
                    <Image src={'/images/lab/vector.svg'} alt="Lumina Arrow" width={25} height={20} className="object-contain" />
                    <h2 className='font-bold text-4xl'>LUMI-2</h2>
                </div>
                <p className='text-sm leading-6'>Applying a thin, self-organized layer of molecules to a gold surface can change its energy properties, specifically the Fermi level, which is related to how easily electrons move. When done carefully, this adjustment can make the gold&apos;s energy levels match those of an organic semiconductor, improving how efficiently the two materials interact.</p>
                <p className='text-sm leading-6'>This can significantly reduce electrical resistance at the connection point, leading to much lower power requirements and dramatically boosting performance in devices like organic solar cells, OLEDs, and organic transistors—sometimes by a factor of a million.</p>
                <p className='text-sm leading-6'>In our study, we explored how this energy shift could be controlled using an external stimulus. We embedded light-sensitive molecules in the layer, allowing us to change and reverse the energy properties of the surface using light. We then analyzed how the structure of these molecules influenced the gold’s energy levels using spectroscopy.</p>
            </div>
            <div className='lg:w-1/2'>
                <Image
                    src={'/images/lab/lab-3.png'}
                    alt='LuminaLab Image 1'
                    width={605}
                    height={550}
                    className='rounded-4xl object-cover lg:h-[550px]'
                />
            </div>
        </section>
        <section className='flex lg:flex-row flex-col-reverse gap-12 lg:gap-0 justify-between w-[85vw] lg:max-w-7xl mx-auto lg:py-24 py-12'>
            <div className='lg:w-1/2'>
                <Image
                    src={'/images/lab/lab-4.png'}
                    alt='LuminaLab Image 1'
                    width={605}
                    height={550}
                    quality={100}
                    className='rounded-4xl object-cover lg:h-[550px]'
                />
            </div>
            <div className='lg:w-[520px] flex flex-col gap-6 lg:pt-8'>
                <div className='flex gap-6 items-center'>
                    <Image src={'/images/lab/vector.svg'} alt="Lumina Arrow" width={25} height={20} className="object-contain" />
                    <h2 className='font-bold text-4xl'>LUMI-3</h2>
                </div>
                <p className='text-sm leading-6'>At Molecular Interfaces, we are committed to advancing OLED technology through innovative material solutions. Our latest research explores the critical role of surface energy and terminal functional groups within monolayers in influencing the adhesion of metal-organic frameworks (MOFs) to various surfaces. By optimizing these molecular interactions, we enhance the efficiency, transparency, and light output of OLED displays, addressing key industry challenges in next-generation applications such as AR/VR and under-display cameras.</p>
                <p className='text-sm leading-6'>This project delves into how tailored monolayer properties improve MOF integration, allowing for superior stability and performance in display technologies. Through strategic manipulation of surface chemistry, we enable more effective bonding, reducing energy loss and improving material efficiency. As we refine these methodologies, Molecular Interfaces continues to push the boundaries of OLED innovation, delivering practical solutions to manufacturers seeking enhanced performance and sustainability.</p>
            </div>
        </section>
        <section className='flex lg:flex-row flex-col gap-12 lg:gap-0 justify-between w-[85vw] lg:max-w-7xl mx-auto lg:py-24 py-12'>
            <div className='lg:w-[520px] flex flex-col gap-6 lg:pt-8'>
                <div className='flex gap-6 items-center'>
                    <Image src={'/images/lab/vector.svg'} alt="Lumina Arrow" width={25} height={20} className="object-contain" />
                    <h2 className='font-bold text-4xl'>LUMI-4</h2>
                </div>
                <p className='text-sm leading-6'>At Molecular Interfaces, we explore advanced material innovations to enhance OLED performance. Our latest research investigates how tethered catalysts can precisely pattern surfaces, influencing adhesion properties and optimizing material interactions. By leveraging controlled surface chemistry, this approach enables improved integration of key components, enhancing efficiency, transparency, and energy optimization in next-generation OLED applications.</p>
                <p className='text-sm leading-6'>Through this study, we refine methodologies for surface modification, allowing manufacturers to achieve more reliable and scalable solutions for high-performance displays. As we push the boundaries of OLED technology, Molecular Interfaces remains at the forefront of innovation, delivering practical advancements for cutting-edge applications in AR/VR, under-display cameras, and wearable technologies.</p>
            </div>
            <div className='lg:w-1/2'>
                <Image
                    src={'/images/lab/lab-5.png'}
                    alt='LuminaLab Image 1'
                    width={605}
                    height={550}
                    className='rounded-4xl object-cover lg:h-[550px]'
                />
            </div>
        </section>
        <section className='flex lg:h-[550px] mx-auto w-[85vw] lg:max-w-7xl relative mb-24'>
            <Image src={'/images/lab/lab-6.jpg'} alt='Background texture' fill className='object-cover rounded-4xl' />
            <div className='absolute w-full h-full left-0 top-0 rounded-4xl bg-brand-dark/60' />
            <div className='flex flex-col lg:flex-row items-center relative z-10 w-full lg:justify-around'>
                <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" width={170} height={280} className="w-24 h-48 rotate-90 lg:w-full" />
                <h4 className='text-white font-bold text-4xl'>Coming Soon!</h4>
                <div className='flex flex-col gap-4 lg:w-[425px] text-white px-8 lg:px-0 py-6 lg:py-0'>
                    <p className='text-sm leading-6'>Our latest chemical material product, designed to optimize device and material properties is set to deliver transformative performance enhancements.</p>
                    <p className='text-sm leading-6'>Engineered for superior efficiency and next-generation organic semiconductor applications, this revolutionary formulation is redefining possibilities in light-emitting diodes and beyond.</p>
                    <p className='text-sm leading-6'>A breakthrough in material innovation is on the horizon!</p>
                    <p className='text-sm leading-6'>Stay tuned!</p>
                </div>
            </div>
        </section>
    </div>
  )
}
