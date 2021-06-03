import axios from 'axios';
import { register } from './AuthService';

const apiUrl = 'http://localhost:5000';

/**
 * function used to fetch a single user by given id
 */
export function getAllUsers() {
    return axios.get(`${apiUrl}/users`);
}

/**
 * function used to fetch a single user by given id
 * @param {id} id => holds the information about the user's id
 */
export function getUserById(id) {
    return axios.get(`${apiUrl}/users/${id}`);
}

/**
 * function used to handle the saving of user data
 * @param {userData} userData => holds the information about the user that we're going to edit/create
 */
export function saveUser(userData) {
    if (userData.id) {
        return axios.put(`${apiUrl}/users/${userData.id}`, userData);
    }

    return register(userData);
}

/**
 * handles the logic of deleting the given user
 * @param {id} id => the id of the user that should be deleted
 */
export function deleteUser(id) {
    return axios.delete(`${apiUrl}/users/${id}`);
}
