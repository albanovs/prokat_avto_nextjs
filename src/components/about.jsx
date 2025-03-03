import Image from "next/image";

export default function AboutBlock() {
    return (
        <section className="container w-full mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">О КОМПАНИИ</h2>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="lg:w-1/2 lg:text-lg text-sm font-semibold">
                    <p className="mb-4">
                        Компания «Европа» предлагает широкий спектр услуг по аренде автомобилей для любых целей: от деловых поездок до семейного отдыха. Мы предоставляем только проверенные и надёжные автомобили от ведущих автопроизводителей, обеспечивая комфорт и безопасность наших клиентов.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFCB00]">✔</span> Большой выбор автомобилей разных марок и моделей
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFCB00]">✔</span> Гибкая система скидок и специальных предложений
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFCB00]">✔</span> Круглосуточная поддержка клиентов
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFCB00]">✔</span> Страхование транспортных средств и гражданской ответственности
                        </li>
                    </ul>
                </div>
                <div className="lg:w-1/2">
                    <Image
                        src="/image_about.png"
                        alt="Автомобиль"
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
