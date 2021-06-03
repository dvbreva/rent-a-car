import axios from 'axios';

const apiUrl = 'http://localhost:5000';

export function getAllCars() {
    return axios.get(`${apiUrl}/cars`);
}

export function getCarById(id) {
    return axios.get(`${apiUrl}/cars/${id}`);
}

export function saveCar(carData) {
    if (carData.id) {
        return axios.put(`${apiUrl}/cars/${carData.id}`, carData);
    } else {
        return axios.post(`${apiUrl}/cars`, carData);
    }
}

export function deleteCar(id) {
    return axios.delete(`${apiUrl}/cars/${id}`);
}
