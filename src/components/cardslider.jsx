"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const categories = [
    { name: "Седаны", image: "/sedan.png" },
    { name: "Внедорожники", image: "/suv.png" },
    { name: "Минивэны", image: "/minivan.png" },
    { name: "Спорткары", image: "/sportcar.png" },
    { name: "Эконом", image: "/ekonom.png" },
    { name: "Комфорт", image: "/comfort.png" },
    { name: "Комфорт", image: "/comfort.png" },
];

const brands = [
    { image: "/subaru.png" },
    { image: "/lexus.png" },
    { image: "/mazda.png" },
    { image: "/r.png" },
    { image: "/hundai.png" },
    { image: "/priora.png" },
    { image: "/lion.png" },
    { image: "/ford.png" },
];

export default function CarSlider() {
    const prevRefCategories = useRef(null);
    const nextRefCategories = useRef(null);
    const prevRefBrands = useRef(null);
    const nextRefBrands = useRef(null);

    return (
        <div className="p-4 mt-10 lg:mx-20 bg-white rounded-lg shadow-md">
            <div className="p-4 mt-10 lg:mx-20 relative">
                <div className="relative">
                    <div className="absolute top-1/2 lg:-left-9 -left-0 z-10 cursor-pointer" ref={prevRefCategories}>
                        <GrLinkPrevious color="#FFCB00" size={25} />
                    </div>
                    <div className="absolute top-1/2 lg:-right-9 -right-0 z-10 cursor-pointer" ref={nextRefCategories}>
                        <GrLinkNext color="#FFCB00" size={25} />
                    </div>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        centeredSlides={true}
                        navigation={{ prevEl: prevRefCategories.current, nextEl: nextRefCategories.current }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 7 },
                        }}
                        modules={[Navigation]}
                        className="my-4"
                        onSwiper={(swiper) => {
                            setTimeout(() => {
                                if (swiper?.params?.navigation) {
                                    swiper.params.navigation.prevEl = prevRefCategories.current;
                                    swiper.params.navigation.nextEl = nextRefCategories.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }
                            });
                        }}
                    >
                        {categories.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col justify-between items-center">
                                    <Image src={item.image} alt={item.name} width={100} height={100} />
                                    <span className="text-sm mt-2">{item.name}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="relative mt-6">
                    <div className="absolute top-1/2 lg:-left-9 -left-0 z-10 cursor-pointer" ref={prevRefBrands}>
                        <GrLinkPrevious size={25} color="#FFCB00" /></div>
                    <div className="absolute top-1/2 lg:-right-9 -right-0 z-10 cursor-pointer" ref={nextRefBrands}>
                        <GrLinkNext size={25} color="#FFCB00" /></div>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        centeredSlides={true}
                        navigation={{ prevEl: prevRefBrands.current, nextEl: nextRefBrands.current }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 7 },
                        }}
                        modules={[Navigation]}
                        className="my-4"
                        onSwiper={(swiper) => {
                            setTimeout(() => {
                                if (swiper?.params?.navigation) {
                                    swiper.params.navigation.prevEl = prevRefBrands.current;
                                    swiper.params.navigation.nextEl = nextRefBrands.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }
                            });
                        }}
                    >
                        {brands.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col justify-between items-center">
                                    <Image src={item.image} alt={item.image} width={100} height={100} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="flex flex-col lg:flex-row justify-center gap-4 mt-4">
                    <Link href="/cars" className="px-4 py-2 bg-[#FFCB00] text-white font-semibold rounded-lg hover:bg-[#FFCB00] hover:text-white">
                        Все автомобили
                    </Link>
                    <Link href="/cars" className="px-4 py-2 border-2 border-[#FFCB00] text-[#FFCB00] font-semibold rounded-lg hover:bg-[#FFCB00] hover:text-white">
                        Новинки парка
                    </Link>
                    <Link href="/cars" className="px-4 py-2 border-2 border-[#FFCB00] text-[#FFCB00] font-semibold rounded-lg hover:bg-[#FFCB00] hover:text-white">
                        Спецпредложения
                    </Link>
                </div>
            </div>
        </div>
    );
}