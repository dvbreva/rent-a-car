import axios from 'axios';

const apiUrl = 'http://localhost:5000';

export function getAllUsers() {
    return axios.get(`${apiUrl}/users`);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/users/${id}`);
}
