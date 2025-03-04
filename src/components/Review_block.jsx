'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useRef } from "react";

const reviews = [
    {
        name: "Лариса",
        rating: 5,
        text: "С самого начала меня приятно удивили доступные тарифы и широкий выбор автомобилей на любой вкус и кошелёк...",
        image: "/review.png",
    },
    {
        name: "Анна",
        rating: 5,
        text: "С самого начала меня приятно удивили доступные тарифы и широкий выбор автомобилей...",
        image: "/review.png",
    },
    {
        name: "Эланора",
        rating: 5,
        text: "С самого начала меня приятно удивили доступные тарифы и широкий выбор автомобилей...",
        image: "/review.png",
    },
];

export default function ReviewsSlider() {
    const swiperRef = useRef(null);

    return (
        <section className="max-w-6xl mx-auto text-center py-10 px-4 relative">
            <h2 className="text-4xl font-bold mb-20">ОТЗЫВЫ</h2>
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    className="w-full"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-lg shadow-lg">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <Image src={review.image} alt="Отзыв клиента" width={350} height={250} className="rounded-lg shadow-md" />
                                </div>
                                <div className="w-full md:w-2/3 text-left">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Image src="/avatar.png" alt={review.name} width={50} height={50} className="rounded-full" />
                                        <div>
                                            <h3 className="text-xl font-semibold">{review.name}</h3>
                                            <div className="text-[#FFCB00]">{'⭐'.repeat(review.rating)}</div>
                                        </div>
                                    </div>
                                    <p className="text-lg text-gray-700">{review.text}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="absolute top-[-50px] lg:top-40 left-0 flex lg:justify-between justify-center gap-5 w-full px-4 pointer-events-none">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="prev-btn text-[#FFCB00] text-3xl pointer-events-auto lg:absolute lg:left-[-50px]">
                        <GrPrevious color='[#FFCB00]' />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="next-btn text-[#FFCB00] text-3xl pointer-events-auto lg:absolute lg:right-[-50px]">
                        <GrNext color='[#FFCB00]' />
                    </button>
                </div>
            </div>
        </section>
    );
}
