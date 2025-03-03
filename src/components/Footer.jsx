'use client';

import Link from "next/link";
import Image from "next/image";
import { BsTelegram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { checkBidStatus } from "@/app/utils/api";

const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/cars", label: "Автомобили" },
    { href: "/clients", label: "Клиентам" },
    { href: "/partnership", label: "Сотрудничество" },
    { href: "/about", label: "О компании" },
    { href: "/contact", label: "Контакты" },
    { href: "/excursions", label: "Экскурсии" },
];

export default function Footer() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [bidNumber, setBidNumber] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

     const checkBidStatusfunc = async () => {
            setLoading(true);
            setStatus(null);
            try {
                if (!phone || !bidNumber) {
                    setStatus({ bid_status_title: "Введите номер телефона и номер заявки" });
                    return;
                }
                const data = await checkBidStatus(phone, bidNumber);
                setStatus(data);
            } catch (error) {
                setStatus({ bid_status_title: "Ошибка запроса" });
            }
            setLoading(false);
        };

    return (
        <footer className="mt-20 pb-5 w-full bg-white shadow-md lg:pl-20 lg:pr-20">
            <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center px-6 py-4">
                <Link href="/" className="shrink-0 lg:pr-10">
                    <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </Link>
                <div className="flex-1 flex flex-col gap-5">
                    <div className="flex flex-col lg:flex-row justify-between w-full">
                        <div className="flex flex-col lg:flex-row items-center gap-10">
                            <a className="font-bold" href="tel:+84012500700">8(4012) 500-700</a>
                            <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#FFCB00] text-white text-center py-2 rounded-lg hover:border-[#ffb233] hover:bg-[#ffb233]">Проверить заявку</button>
                        </div>
                        <div className="flex mt-10 lg:mt-0 gap-5 items-center">
                            <BsTelegram size={30} color="#0088CC" />
                            <IoLogoWhatsapp size={35} color="#25D366" />
                            <a href="mailto:europacarrent@yandex.ru">europacarrent@yandex.ru</a>
                        </div>
                    </div>
                    <nav className="flex-col lg:flex-row flex justify-between w-full">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-gray-600 text-sm font-semibold uppercase hover:text-[#FFCB00] transition">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="container mx-auto flex justify-between  items-center px-6 py-4">
                <div>
                    <a href="" className="text-[12px]">Политика конфиденциальности</a>
                </div>
                <div>
                    <a className="text-[12px] flex gap-2 items-center" href="https://xo-webstudio.ru/">
                        <Image src="/xo.png" alt="XO Studio" width={30} height={30} />
                        Разработано маркетинговым <br />
                        агенством XO-STUDIO
                    </a>
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-lg font-bold mb-4">Проверка статуса заявки</h2>
                            <input
                                type="text"
                                placeholder="Введите номер телефона"
                                className="w-full p-2 border rounded mb-3"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Введите номер заявки"
                                className="w-full p-2 border rounded mb-3"
                                value={bidNumber}
                                onChange={(e) => setBidNumber(e.target.value)}
                            />
                            <button
                                className="w-full bg-[#FFCB00] text-white py-2 rounded-lg hover:bg-[#ffb233]"
                                onClick={checkBidStatusfunc}
                                disabled={loading}
                            >
                                {loading ? "Проверяем..." : "Проверить"}
                            </button>
                            {status && (
                                <p className="mt-4 text-center font-semibold">{status.bid_status_title}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
}