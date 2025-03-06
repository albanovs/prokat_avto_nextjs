export default function Contact() {
    return (
        <div className="lg:mx-20 mx-5">
            <section className="mb-6">
                <h1 className="text-2xl font-bold text-center mb-6">КОНТАКТЫ</h1>
                <div className=" p-6 rounded-lg flex flex-col md:flex-row">
                    <div className="md:w-1/2 space-y-4">
                        <div><p><strong>Адрес:</strong></p> г. Калининград, улица Орудийная, дом 103</div>
                        <div><p><strong>Телефон:</strong></p><a href="tel:+84012500700" className="text-blue-600">8(4012) 500-700</a> </div>
                        <div><p><strong>Электронная почта:</strong></p> <a href="mailto:europacarrent@yandex.ru" className="text-blue-600">europacarrent@yandex.ru</a></div>
                        <a href="https://wa.me/79097840433" className="bg-[#128C4E]  text-white py-2 px-4 rounded-lg inline-block mr-2">Написать в WhatsApp</a>
                        <a href="https://wa.me/79097840433" className="bg-[#005F99]  text-white py-2 px-4 rounded-lg inline-block">Написать в Telegram</a>
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=20.563461%2C54.744851&z=16&pt=20.563461,54.744851,pm2rdl"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}