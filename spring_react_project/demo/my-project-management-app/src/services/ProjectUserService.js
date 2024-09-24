import axios from 'axios';
const API_URL = 'http://localhost:8080/api/project-users';

// Get project users by user ID
export const getProjectUsersByUserId = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}`);
};

// Get project users by project ID
export const getProjectUsersByProjectId = async (projectId) => {
    return await axios.get(`${API_URL}/projects/${projectId}`);
};