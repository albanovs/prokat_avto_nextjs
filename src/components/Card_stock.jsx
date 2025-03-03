export default function CardStock() {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <h2 className="text-3xl font-bold mb-6">АКЦИИ</h2>
            <div className="flex lg:flex-row flex-col gap-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-wull flex flex-col items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#FFCB00]">Сезонные скидки</h3>
                        <p className="text-gray-700 mt-2">
                            Предоставление скидки на аренду автомобилей в первые недели весны, летние предложения
                            «третий день бесплатно» и осенние скидки для студентов
                        </p>
                    </div>
                    {/* <button className="mt-4 bg-[#FFCB00] hover:bg-[#ffb233] text-white font-bold py-2 px-4 rounded-lg">
                        Забронировать
                    </button> */}
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full flex flex-col items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#FFCB00]">Праздники на колёсах</h3>
                        <p className="text-gray-700 mt-2">
                            Скидки на аренду в праздничные дни — Новый год и Рождество
                        </p>
                    </div>
                    {/* <button className="mt-4 bg-[#FFCB00] hover:bg-[#ffb233] text-white font-bold py-2 px-4 rounded-lg">
                        Забронировать
                    </button> */}
                </div>
            </div>
        </div>
    );
}