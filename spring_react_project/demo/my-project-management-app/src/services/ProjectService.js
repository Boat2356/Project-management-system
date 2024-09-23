import axios from 'axios';
const API_URL = 'http://localhost:8080/api/projects';

// Get all projects
export const getAllProjects = async () => {
    return await axios.get(API_URL);
};

// Get a single project by ID
export const getProjectById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Create a new project
export const createProject = (projectData, files) => {
    const formData = new FormData();
    formData.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
    formData.append('course_code', projectData.course_code);
    formData.append('supervisorId', projectData.supervisorId);
    projectData.userIds.forEach(userId => formData.append('userIds', userId));
    if (files.proposalFile) formData.append('proposalFile', files.proposalFile);
    if (files.fullDocumentFile) formData.append('fullDocumentFile', files.fullDocumentFile);
    if (files.imageFile) formData.append('imageFile', files.imageFile);

    return axios.post(`${API_URL}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

// Update an existing project
export const updateProject = (id, projectData, files) => {
    const formData = new FormData();
    formData.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
    formData.append('course_code', projectData.course_code);
    formData.append('supervisorId', projectData.supervisorId);
    projectData.userIds.forEach(userId => formData.append('userIds', userId));
    if (files.proposalFile) formData.append('proposalFile', files.proposalFile);
    if (files.fullDocumentFile) formData.append('fullDocumentFile', files.fullDocumentFile);
    if (files.imageFile) formData.append('imageFile', files.imageFile);

    return axios.put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

// Delete a project
export const deleteProject = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}

// get file metadata
export const getFileMetadata = (projectId) => {
  return axios.get(`${API_URL}/${projectId}/download`);
};

// download file
export const downloadFile = (url) => {
  return axios.get(url, { responseType: 'blob' });
}

// Change project status
export const changeProjectStatus = async (projectId) => {
  return await axios.put(`${API_URL}/${projectId}/status`);
};

export const changeMultipleProjectStatuses = async (projectIds) => {
  return await axios.put(`${API_URL}/status`, projectIds);
}
