import LabPageComponent from '@/components/LabPageComponent'
import PastelRibbons3D from '@/components/PastelRibbons3D'
import Image from 'next/image'
import React from 'react'

export default function LabPage() {
  return (
    <div>
        <section className='h-[700px] relative'>
            <PastelRibbons3D />
            <div className='w-[85vw] lg:max-w-7xl mx-auto relative z-10'>
                <div className='flex items-center gap-6 pt-44'>
                    <Image src={'/images/vectors/angle.svg'} alt="Lumina Arrow" width={35} height={40} className="object-contain" />
                    <div className='flex flex-col w-fit lg:items-end pt-8'>
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
        <LabPageComponent />
    </div>
  )
}
