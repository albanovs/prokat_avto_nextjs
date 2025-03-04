"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { BsTelegram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { checkBidStatus } from "../app/utils/api";

const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/cars", label: "Автомобили" },
    { href: "/clients", label: "Клиентам" },
    { href: "/partnership", label: "Сотрудничество" },
    { href: "/about", label: "О компании" },
    { href: "/contact", label: "Контакты" },
    { href: "/excursions", label: "Экскурсии" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
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
        <header className="lg:static fixed top-0 left-0 w-full bg-white shadow-md z-50 lg:pl-20 lg:pr-20">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
                <Link href="/" className="shrink-0 lg:pr-10">
                    <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </Link>

                <div className="flex-1 flex flex-col gap-5">
                    <div className="hidden md:flex justify-between w-full">
                        <div className="flex items-center gap-10">
                            <a className="font-bold" href="tel:+84012500700">8(4012) 500-700</a>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#FFCB00] text-white text-center py-2 px-5 rounded-lg hover:border-[#ffb233] hover:bg-[#ffb233]">Проверить заявку</button>
                        </div>
                        <div className="flex gap-5 items-center">
                            <BsTelegram size={30} color="#0088CC" />
                            <IoLogoWhatsapp size={35} color="#25D366" />
                            <a href="mailto:europacarrent@yandex.ru">europacarrent@yandex.ru</a>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="lg:hidden text-center text-sm w-full rounded-lg underline">Проверить заявку</button>
                    <nav className="hidden md:flex justify-between w-full">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-gray-600 text-sm font-semibold uppercase hover:text-[#FFCB00] transition">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} className="ml-3" />}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md"
                    >
                        <nav className="flex flex-col items-center space-y-4 py-6">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-gray-700 hover:text-gray-900 text-lg" onClick={() => setIsOpen(false)}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                    </motion.div>
                )}
            </AnimatePresence>
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
        </header>
    );
}