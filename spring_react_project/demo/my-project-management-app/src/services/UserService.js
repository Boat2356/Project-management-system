import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users';

// Get all users
export const getUsers = async () => {
    return await axios.get(API_URL + '/all');
};

// Get a single user by ID
export const getUserById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
}

// Create a new user
export const createUser = async (user) => {
    return await axios.post(API_URL + '/register', user);
};

// Login a user
export const loginUser = async (user) => {
    return await axios.post(API_URL + '/login', user);
};

// Update an existing user
export const updateUser = async (id, user) => {
    return await axios.put(`${API_URL}/${id}`, user);
};

// Delete a user
export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};


