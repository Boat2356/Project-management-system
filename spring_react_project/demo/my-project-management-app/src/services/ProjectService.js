import axios from 'axios';
const API_URL = 'http://localhost:8080/api/projects';

// Get all projects
export const getProjects = async () => {
    return await axios.get(API_URL);
};

// Get a single project by ID
export const getProjectById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Create a new project
export const createProject = async (project) => {
    return await axios.post(API_URL, project);
};

// Update an existing project
export const updateProject = async (id, project) => {
    return await axios.put(`${API_URL}/${id}`, project);
};

// Delete a project
export const deleteProject = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}