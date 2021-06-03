import { getAllUsers } from './UserService';
import axios from 'axios';

const apiUrl = 'http://localhost:5000';

/**
 * @returns the logged user or undefined
 */
export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

/**
 * @returns a boolean indicating whether the logged user is admin
 */
export function isUserAdmin() {
    const { isAdmin } = JSON.parse(localStorage.getItem('loggedUser'));
    return isAdmin;
}

/**
 * @param userData => { username, password }
 */
export async function login(userData) {
    const users = (await getAllUsers()).data;
    const loggedUser = users.find(
        u =>
            u.email === userData.email &&
            u.password.toString() === userData.password
    );

    if (loggedUser) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return;
    }

    throw new Error('Invalid username/password.');
}

/**
 *
 * @param {userData} userData => holds all of the information for the user
 */
export async function register(userData) {
    const users = (await getAllUsers()).data;

    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already exists!');
    }

    userData = {
        ...userData,
        isAdmin: false
    };

    return axios.post(`${apiUrl}/users`, userData);
}

/**
 * function used to handle the logout functionality
 */
export function logout() {
    localStorage.removeItem('loggedUser');
}
