import axios from 'axios';
const API_URL = 'http://localhost:8080/api/supervisors';

// Get all supervisors
export const getSupervisors = async () => {
    return await axios.get(API_URL);
};

// Get a single supervisor by ID
export const getSupervisorById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Create a new supervisor
export const createSupervisor = async (supervisor) => {
    return await axios.post(API_URL, supervisor);
};

// Update an existing supervisor
export const updateSupervisor = async (id, supervisor) => {
    return await axios.put(`${API_URL}/${id}`, supervisor);
};

// Delete a supervisor
export const deleteSupervisor = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};