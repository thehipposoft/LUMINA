'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

type Props = {
    slides: {
        image: string;
        text: string;
    }[];
};

const Carousel = ({
    slides
}: Props) => {
    return (
        <div>
            <Swiper
                modules={[Pagination, EffectFade]}
                slidesPerView={1}
                effect={'fade'}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !h-4 !w-4 bg-white opacity-50',
                    bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active opacity-100 md:!bg-white !bg-brand-primary',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                autoplay={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className='absolute top-0 left-0 w-full h-full bg-black/10 z-10 shape hidden md:block' />
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="w-full object-cover shape hidden md:block"
                        />
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            width={400}
                            height={400}
                            className="w-full object-cover h-[300px] md:hidden rounded-lg"
                        />
                        <div className='lg:absolute relative z-20 lg:bottom-12 pt-4 md:pt-0 '>
                            <p className='md:w-[380px] text-sm'>
                                {slide.text}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
