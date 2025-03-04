import AboutBlock from "@/components/about";
import CardStock from "@/components/Card_stock";
import ReviewsSlider from "@/components/Review_block";
import Image from "next/image";
import Cars from "./cars";
import Link from "next/link";
import CarSlider from "@/components/cardslider";

export const metadata = {
  title: "Аренда автомобилей в Европа – Лучшие цены | Ваш сайт",
  description: "Аренда авто в Европа по выгодным ценам. Большой выбор автомобилей: Renault, Hyundai, Volkswagen, Opel и другие. Быстрое бронирование онлайн!",
  openGraph: {
    title: "Аренда автомобилей Аренда Европа",
    description: "Лучший сервис аренды авто. Широкий выбор машин и удобное бронирование.",
    url: "https://ваш-домен.com",
    siteName: "Ваш сайт",
    images: [
      {
        url: "/red_car.png",
        width: 1200,
        height: 630,
        alt: "Красный автомобиль",
      },
    ],
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="lg:mx-20 mx-5">
      <div className="bg-white relative rounded-3xl flex flex-col items-center justify-center">
        <h1 className="absolute top-10 lg:text-[100px] text-4xl text-center font-bold uppercase tracking-wide text-gray-200">
          АРЕНДА ЕВРОПА
          <span className="absolute inset-0 text-white opacity-50 blur-[3px]">АРЕНДА ЕВРОПА</span>
        </h1>
        <div className="flex items-center lg:flex-row flex-col justify-center lg:mt-[150px] mt-[90px] lg:px-10 px-5">
          <div className="flex lg:items-start flex-col gap-3 max-w-lg">
            <h2 className="lg:text-4xl text-center lg:text-start text-xl font-bold uppercase">Аренда автомобилей</h2>
            <h3 className="text-xl text-center lg:font-bold">На все случаи жизни</h3>
            <p className="text-center lg:text-start text-sm">
              Новые машины ведущих мировых производителей: Renault, Hyundai, Volkswagen, Opel, Chevrolet, Kia и другие.
              Автомобили разных классов: эконом, стандарт, бизнес, премиум.
            </p>
            <Link href="/cars" className="bg-[#FFCB00] text-center hover:bg-[#ffb233] text-white font-bold py-3 px-6 rounded-lg">Арендовать автомобиль</Link>
          </div>
          <div className="ml-10 flex-shrink-0">
            <Image
              width={600}
              height={300}
              src="/red_car.png"
              alt="Аренда красного автомобиля"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div>
        <CarSlider />
      </div>
      <div className="mt-20">
        <h2 className="lg:text-3xl font-bold">АРЕНДА АВТОМОБИЛЕЙ В МОСКВЕ</h2>
        <Cars />
      </div>
      <div className="mt-10">
        <CardStock />
      </div>
      <div className="mt-10">
        <AboutBlock />
      </div>
      <div className="mt-20">
        <ReviewsSlider />
      </div>
    </div>
  );
}