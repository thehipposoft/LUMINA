'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
                // install Swiper modules
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !h-4 !w-4 bg-white opacity-50',
                    bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active opacity-100 !bg-white',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            width={675}
                            height={584}
                            className="w-full object-cover"
                        />
                        <div className='absolute left-0 bottom-0'>
                            <p className=''>
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
