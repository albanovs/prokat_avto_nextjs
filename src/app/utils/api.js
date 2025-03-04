'use server';

import { cookies } from 'next/headers';
const API_URL = 'http://78.36.203.128:50500/data_api';

// const getAuthToken = () => (typeof window !== "undefined" ? localStorage.getItem('tokencarprokat') : '');

const fetchWithAuth = async (url, options = {}) => {
    // const authToken = getAuthToken();
    const authToken = cookies().get('authToken')?.value;
    if (!authToken) throw new Error('Unauthorized: No token available');

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${authToken}`,
        },
    }).then(res => res.json());
};

export const fetchCars = async () => {
    return fetchWithAuth(`${API_URL}/car_list`);
};

export const fetchCities = async () => {
    return fetchWithAuth(`${API_URL}/city_list`);
};

export const fetchFreeCars = async (cityId, beginDate, endDate) => {
    return fetchWithAuth(`${API_URL}/car_free_list?city_id=${cityId}&begin=${beginDate}&end=${endDate}&include_reserves=true&include_idles=true`);
};

export const fetchPlaces = async () => {
    return fetchWithAuth(`${API_URL}/place_list`);
};

export const checkBidStatus = async (phone, bidNumber) => {
    return fetchWithAuth(`${API_URL}/bid_status?phone=${phone}&bid_number=${bidNumber}`);
};

export const fetchCarTariffs = async (carId) => {
    return fetchWithAuth(`${API_URL}/tariff_list?car_id=${carId}`);
};

export const fetchServices = async () => {
    return fetchWithAuth(`${API_URL}/service_list`);
};

export const checkBidCost = async (params) => {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`${API_URL}/bid_cost?${query}`);
};

export const createBid = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    return fetchWithAuth(`${API_URL}/bid_create`, {
        method: 'PUT',
        body: formData,
    });
};
