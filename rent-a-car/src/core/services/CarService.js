import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const apiUrl = 'http://localhost:5000';

/**
 * function used to fetch all the cars in the system
 */
export function getAllCars() {
    return axios.get(`${apiUrl}/cars`);
}

/**
 * function used to fetch a single car by given id
 * @param {id} id => holds the information about the car's id
 */
export function getCarById(id) {
    return axios.get(`${apiUrl}/cars/${id}`);
}

/**
 * function used to save a single car by given request data
 * @param {carData} carData => holds the information about the car we want to edit/create
 */
export function saveCar(carData) {
    if (carData.id) {
        return axios.put(`${apiUrl}/cars/${carData.id}`, carData);
    } else {
        return axios.post(`${apiUrl}/cars`, carData);
    }
}

/**
 * function used to delete a single car by given id
 * @param {id} id => holds the information about the car's id
 */
export function deleteCar(id) {
    return axios.delete(`${apiUrl}/cars/${id}`);
}

/**
 * function used to save a rental event
 */
export async function rentCar(carId, userId) {
    const originalCar = (await getCarById(carId)).data;
    const updatedCar = { ...originalCar, isAvailable: false, rentedBy: userId };
    const res = await saveCar(updatedCar);
    if (res.status === 200) {
        const carRental = { id: uuidv4(), rentedCar: carId, rentedBy: userId };
        const result = await axios.post(`${apiUrl}/rentals`, carRental);
        return result;
    } else {
        throw new Error();
    }
}
