'use client'

import { useEffect, useState } from 'react';
import { fetchCars, fetchCarTariffs, fetchCities } from '../utils/api';
import { Pagination } from './pagination';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import './style.css'

export default function Cars({ data }) {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [carTariffs, setCarTariffs] = useState({});
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [authToken, setAuthToken] = useState(null);
    const carsPerPage = 12;
    const router = useRouter();
    const isDataValidArray = Array.isArray(data);
    const filteredCars = isDataValidArray ? (data.length > 0 ? cars.filter(car => data.includes(car.car_id)) : []) : cars;

    useEffect(() => {
        Cookies.get('authToken') ? setAuthToken(Cookies.get('authToken')) : setAuthToken(null);
        if (authToken) {
            const loadData = async () => {
                try {
                    const [carsData, citiesData] = await Promise.all([fetchCars(), fetchCities()]);
                    setCars(carsData.cars);
                    setCities(citiesData.cities);
                } catch (error) {
                    console.error("Ошибка загрузки данных", error);
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        } else {
            const getToken = async () => {
                try {
                    const response = await fetch('/api/auth', {
                        method: 'GET',
                    });
                    const data = await response.json();
                    setAuthToken(data.token);
                } catch (error) {
                    console.error("Ошибка получения токена", error);
                }
            };
            getToken();
        }
    }, [authToken]);

    const handleCarClick = (car) => {
        setSelectedCar(car);
        fetchCarTariffs(car.car_id).then(data => setCarTariffs(data));
    };

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageDetailCars = (car) => {
        localStorage.setItem('selectedCar', JSON.stringify(car));
        router.push(`/booking/${car.car_id}`);
    }

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="loader-spinner"></div>
            </div>
        );
    }

    return (
        <div className="text-center p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
                {currentCars.length ? currentCars.map(car => (
                    <div key={car.car_id} className="bg-white flex flex-col justify-between rounded-lg shadow-lg p-4 w-[413] h-[380px]">
                        <img className="w-full h-40 object-cover rounded-lg" src={car.photo_guid ? `http://78.36.203.128:50500/data_api/${car.photo_guid}` : '/image_about.png'} alt={car.model} />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">{car.model}</h3>
                            <div className='flex items-start justify-between'>
                                <p className="text-gray-500 text-[12px]">Год выпуска: {car.year}</p>
                                <p className="text-gray-500 text-[12px]">Гос. номер: {car.number}</p>
                                <p className="text-gray-500 text-[12px]">Город: {car.city_id && cities.find(city => city.city_id === car.city_id)?.title}</p>
                            </div>
                            <div>
                                <button onClick={() => handleCarClick(car)} className="w-full border-[#FFCB00] border text-[#FFCB00] text-center py-2 rounded-lg mt-4 hover:border-[#ffb233] hover:text-[#ffb233]">Подробнее</button>
                                <button onClick={() => handlePageDetailCars(car)} className="w-full bg-[#FFCB00] text-white text-center py-2 rounded-lg mt-4 font-bold hover:bg-[#ffb233]">Забронировать</button>
                            </div>
                        </div>
                    </div>
                )) : "Нет доступных автомобилей."}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            {selectedCar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-2">{selectedCar.model} ({selectedCar.year})</h2>
                        <img className="w-full h-60 object-cover rounded-lg mb-4" src={selectedCar.photo_guid ? `http://78.36.203.128:50500/data_api/${selectedCar.photo_guid}` : '/image_about.png'} alt={selectedCar.model} />
                        <div className='flex justify-between'>
                            <p><strong>Год выпуска:</strong> {selectedCar.year}</p>
                            <p><strong>Гос.номер:</strong> {selectedCar.number}</p>
                            <p><strong>Город:</strong> {selectedCar.city_id && cities.find(city => city.city_id === selectedCar.city_id)?.title}</p>
                        </div>
                        <div>
                            {carTariffs.cars?.map(tariff => (
                                <div key={tariff.car_id}>
                                    <p><strong>Депозит:</strong> {tariff.deposit}</p>
                                    <p><strong>Тарифы:</strong></p>
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
                        <div className='flex justify-between gap-3'>
                            <button onClick={() => handlePageDetailCars(selectedCar)} className="block bg-[#FFCB00] text-white text-center py-2 rounded-lg mt-4 font-bold hover:bg-[#ffb233] w-full">Забронировать</button>
                            <button onClick={() => setSelectedCar(null)} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Закрыть</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}