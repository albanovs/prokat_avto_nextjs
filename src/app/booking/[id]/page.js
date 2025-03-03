'use client';

import { checkBidCost, createBid, fetchCarTariffs, fetchCities, fetchPlaces, fetchServices } from '@/app/utils/api';
import Modal from '@/components/modal';
import React, { useEffect, useState } from 'react';

export default function SelectedCar() {
    const [selectedCar, setSelectedCar] = useState(null);
    const [carTariffs, setCarTariffs] = useState({});
    const [cities, setCities] = useState([]);
    const [places, setPlaces] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [rentalDetails, setRentalDetails] = useState({
        begin: '',
        end: '',
        beginPlaceId: '',
        endPlaceId: '',
        cost: null
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [userData, setUserData] = useState({ fio: '', phone: '' });
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [bidNumber, setBidNumber] = useState();

    useEffect(() => {
        const car = JSON.parse(localStorage.getItem('selectedCar'));
        setSelectedCar(car);
        fetchCarTariffs(car.car_id).then(data => setCarTariffs(data));
        fetchCities().then(data => setCities(data.cities));
        fetchPlaces().then(data => setPlaces(data.places));
        fetchServices().then(data => setServices(data.services));
    }, []);

    const handleCalculateCost = async () => {
        if (!rentalDetails.begin || !rentalDetails.end || !rentalDetails.beginPlaceId || !rentalDetails.endPlaceId) {
            return;
        }
        const response = await checkBidCost({
            car_id: selectedCar.car_id,
            begin: rentalDetails.begin,
            end: rentalDetails.end,
            begin_place_id: rentalDetails.beginPlaceId,
            end_place_id: rentalDetails.endPlaceId
        });
        setRentalDetails(prev => ({ ...prev, cost: response.cost }));
    };

    const handleCreateBid = async () => {
        if (!userData.fio || !userData.phone) {
            setModalOpen(true);
            return;
        }
        const bidData = {
            fio: userData.fio,
            phone: userData.phone,
            car_id: selectedCar.car_id,
            begin: rentalDetails.begin,
            end: rentalDetails.end,
            begin_place_id: rentalDetails.beginPlaceId,
            end_place_id: rentalDetails.endPlaceId,

        };
        const response = await createBid(bidData);
        if (response) {
            setModalOpen(false);
            setUserData({ fio: '', phone: '' });
            setRentalDetails({ begin: '', end: '', beginPlaceId: '', endPlaceId: '', cost: null });
            setBidNumber(response.bid_number);
            setSuccessModalOpen(true);
        }
    };

    if (!selectedCar) {
        return (
            <div className="flex justify-center h-screen">
                <p className="text-gray-500 text-lg">Загрузка данных...</p>
            </div>
        );
    }

    return (
        <div className="lg:mx-20 mx-5 mb-5">
            <div className='flex flex-col lg:flex-row justify-between gap-5'>
                <div className="w-full bg-white shadow-lg p-5">
                    <div className="w-full h-60 md:h-96 overflow-hidden rounded-xl">
                        <img
                            src={selectedCar.image || '/image_about.png'}
                            alt={selectedCar.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-5">
                        <h1 className="text-2xl md:text-4xl font-bold">{selectedCar.name}</h1>
                        <p className="text-gray-500 mt-2 text-sm md:text-base">{selectedCar.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div>
                                <span className="text-sm text-gray-400">Год выпуска</span>
                                <p className="text-sm font-semibold">{selectedCar.year}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-400">Гос. номер</span>
                                <p className="text-sm font-semibold">{selectedCar.number}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-400">Город</span>
                                <p className="text-sm font-semibold">{selectedCar.city_id && cities.find(city => city.city_id === selectedCar.city_id)?.title}</p>
                            </div>
                        </div>
                        <div className='p-4 bg-gray-100 rounded-xl'>
                            {carTariffs.cars?.map(tariff => (
                                <div key={tariff.car_id}>
                                    <p><span className='text-sm text-gray-400'>Депозит:</span> {tariff.deposit}</p>
                                    <p><span className='text-sm text-gray-400'>Тарифы:</span></p>
                                    {tariff.tariffs?.map((t, index) => (
                                        <div className='' key={index}>
                                            <div className='w-full flex justify-between items-center text-[12px]'>
                                                <p>минимальное кол-во дней в периоде: {t.min} </p>
                                                <p>максимальное кол-во дней в периоде: {t.max} </p>
                                                <p>стоимость аренды за один день: {t.cost} </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='p-4 bg-gray-100 rounded-xl mt-5'>

                    </div>
                </div>
                <div className="w-full bg-white shadow-lg p-5">
                    <h2 className="text-xl font-bold mb-3">Расчет стоимости аренды</h2>
                    <label className="block text-sm font-medium">Дата начала:</label>
                    <input type="datetime-local" className="w-full p-2 border rounded" value={rentalDetails.begin} onChange={e => setRentalDetails(prev => ({ ...prev, begin: e.target.value }))} />
                    <label className="block text-sm font-medium mt-2">Дата окончания:</label>
                    <input type="datetime-local" className="w-full p-2 border rounded" value={rentalDetails.end} onChange={e => setRentalDetails(prev => ({ ...prev, end: e.target.value }))} />
                    <label className="block text-sm font-medium mt-2">Место получения:</label>
                    <select className="w-full p-2 border rounded" value={rentalDetails.beginPlaceId} onChange={e => setRentalDetails(prev => ({ ...prev, beginPlaceId: e.target.value }))}>
                        <option value="">Выберите место</option>
                        {places.map(place => <option key={place.place_id} value={place.place_id}>{place.title}  ( доставка {place.delivery_cost}₽ )</option>)}
                    </select>
                    <label className="block text-sm font-medium mt-2">Место возврата:</label>
                    <select className="w-full p-2 border rounded" value={rentalDetails.endPlaceId} onChange={e => setRentalDetails(prev => ({ ...prev, endPlaceId: e.target.value }))}>
                        <option value="">Выберите место</option>
                        {places.map(place => <option key={place.place_id} value={place.place_id}>{place.title}</option>)}
                    </select>
                    <label className="block text-sm font-medium mt-2">Дополнительные услуги:</label>
                    {services.map(service => (
                        <div key={service.service_id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={service.service_id}
                                onChange={e => {
                                    setSelectedServices(prev =>
                                        e.target.checked ? [...prev, service.service_id] : prev.filter(id => id !== service.service_id)
                                    );
                                }}
                            />
                            <span>{service.title} ({service.cost}₽)</span>
                        </div>
                    ))}
                    <button onClick={handleCalculateCost} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full">Рассчитать</button>
                    <p className="mt-3 text-lg font-bold">Итоговая стоимость: {rentalDetails.cost}₽</p>
                    <button onClick={() => setModalOpen(true)} className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full">Оформить заявку</button>
                </div>
                {modalOpen && (
                    <Modal onClose={() => setModalOpen(false)}>
                        <h2 className="text-xl font-bold mb-3">Введите ваши данные</h2>
                        <input type="text" placeholder="ФИО" className="w-full p-2 border rounded" value={userData.fio} onChange={e => setUserData(prev => ({ ...prev, fio: e.target.value }))} />
                        <input type="text" placeholder="Телефон" className="w-full p-2 border rounded mt-2" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                        <button onClick={handleCreateBid} className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full">Подтвердить заявку</button>
                    </Modal>
                )}
                {successModalOpen && (
                    <Modal onClose={() => setSuccessModalOpen(false)}>
                        <h2 className="text-xl font-bold mb-3">Заявка успешно оформлена!</h2>
                        <p className="text-sm text-gray-600">Сохраните номер вашей заявки:</p>
                        <p className="text-lg font-bold text-blue-600">{bidNumber}</p>
                        <button onClick={() => setSuccessModalOpen(false)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full">Закрыть</button>
                    </Modal>
                )}
            </div>
        </div>
    );
}