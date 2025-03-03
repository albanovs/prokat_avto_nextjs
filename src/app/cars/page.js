'use client';

import { useState, useEffect } from 'react';
import { fetchCities, fetchFreeCars } from '@/app/utils/api';
import CardStock from '@/components/Card_stock';
import Cars from './index';
import CarSlider from '@/components/cardslider';

export default function CarsPage() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [availableCars, setAvailableCars] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCities().then(data => setCities(data.cities));
    }, []);

    const handleSearch = async () => {
        if (!selectedCity || !beginDate || !endDate) return;
        setLoading(true);
        if (selectedCity !== 'all') {
            const cars = await fetchFreeCars(selectedCity, beginDate, endDate);
            setAvailableCars(cars);
            setLoading(false);
        } else {
            setAvailableCars({});
            setLoading(false);
        }
    };

    return (
        <div className="lg:mx-20 mx-5">
            <div>
                <CarSlider />
            </div>
            <div className="lg:mt-20 mt-5">
                <h2 className="lg:text-3xl font-bold">АРЕНДА АВТОМОБИЛЕЙ В МОСКВЕ</h2>
                <div className="bg-gray-100 p-5 rounded-lg mt-5">
                    <h3 className="text-xl font-semibold">Поиск свободных машин</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Выберите город:</label>
                            <select
                                className="p-2 border rounded w-full"
                                value={selectedCity}
                                onChange={e => setSelectedCity(e.target.value)}
                            >
                                <option value="">Выберите город</option>
                                <option value="all">Показать все</option>
                                {cities.map(city => (
                                    <option key={city.city_id} value={city.city_id}>{city.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Дата начала аренды:</label>
                            <input
                                type="datetime-local"
                                className="p-2 border rounded w-full"
                                value={beginDate}
                                onChange={e => setBeginDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Дата окончания аренды:</label>
                            <input
                                type="datetime-local"
                                className="p-2 border rounded w-full"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                            />
                        </div>
                        <button
                            className=" bg-[#FFCB00] hover:bg-[#ffb233] text-white px-4 py-2 rounded w-full"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? 'Поиск...' : 'Найти'}
                        </button>
                    </div>
                </div>
                <Cars data={availableCars.cars} />
            </div>
            <div className="mt-10">
                <CardStock />
            </div>
        </div>
    );
}