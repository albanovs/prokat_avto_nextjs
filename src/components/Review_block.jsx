'use client';

import Image from "next/image";
import { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const reviews = [
    {
        name: "Лариса",
        rating: 5,
        text: "С самого начала меня приятно удивили доступные тарифы и широкий выбор автомобилей на любой вкус и кошелёк. Сотрудники компании были вежливы и компетентны, помогли мне выбрать подходящий автомобиль и рассказали о дополнительных услугах. Качество автомобилей оказалось на высшем уровне: все машины были в отличном состоянии, чистые и ухоженные. В целом, я осталась очень довольна сотрудничеством с компанией и рекомендую её всем, кто ищет надёжного партнёра для аренды автомобилей.",
        image: "/review.png",
    },
    {
        name: "Анна",
        rating: 5,
        text: "С самого начала меня приятно удивили доступные тарифы и широкий выбор автомобилей на любой вкус и кошелёк. Сотрудники компании были вежливы и компетентны, помогли мне выбрать подходящий автомобиль и рассказали о дополнительных услугах. Качество автомобилей оказалось на высшем уровне: все машины были в отличном состоянии, чистые и ухоженные. В целом, я осталась очень довольна сотрудничеством с компанией и рекомендую её всем, кто ищет надёжного партнёра для аренды автомобилей.",
        image: "/review.png",
    },
    {
        name: "Эланора",
        rating: 5,
        text: "С самого начала меня приятно удивили доступные тарифы и широкий выбор автомобилей на любой вкус и кошелёк. Сотрудники компании были вежливы и компетентны, помогли мне выбрать подходящий автомобиль и рассказали о дополнительных услугах. Качество автомобилей оказалось на высшем уровне: все машины были в отличном состоянии, чистые и ухоженные. В целом, я осталась очень довольна сотрудничеством с компанией и рекомендую её всем, кто ищет надёжного партнёра для аренды автомобилей.",
        image: "/review.png",
    },
];

export default function ReviewsSlider() {
    const [index, setIndex] = useState(0);

    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <section className="mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">ОТЗЫВЫ</h2>
            <div className="flex relative flex-col lg:flex-row items-center gap-8">
                <button onClick={prevSlide} className="text-red-500 lg:static relative left-[-170px]">
                    <GrPrevious size={30} />
                </button>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="lg:w-1/3">
                        <Image
                            src={reviews[index].image}
                            alt="Отзыв клиента"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="lg:w-2/3 text-lg text-left">
                        <div className="flex items-center gap-4 mb-2">
                            <Image src="/avatar.png" alt="Лариса" width={50} height={50} className="rounded-full" />
                            <div>
                                <h3 className="font-semibold">{reviews[index].name}</h3>
                                <div className="text-yellow-500">{'⭐'.repeat(reviews[index].rating)}</div>
                            </div>
                        </div>
                        <p className="lg:text-base text-sm">{reviews[index].text}</p>
                    </div>
                </div>
                <button onClick={nextSlide} className="text-red-500 lg:static absolute right-0">
                    <GrNext size={30} />
                </button>
            </div>
        </section>
    );
}