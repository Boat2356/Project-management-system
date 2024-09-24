import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../../services/ProjectService';
import { getSupervisors } from '../../services/SupervisorService';
import { getCourses } from '../../services/CourseService';
import { getUsers } from '../../services/UserService';
import { getFileMetadata, downloadFile, changeMultipleProjectStatuses } from '../../services/ProjectService';
import Select from 'react-select';

const ProjectCrud = () => {
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [fileMetadata, setFileMetadata] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    year: '',
    semester: '',
    status: 0,
    courseId: '',
    supervisorId: '',
    userIds: [],
  });
  const [files, setFiles] = useState({
    proposalFile: null,
    fullDocumentFile: null,
    imageFile: null,
  });

  useEffect(() => {
    fetchProjects();
    fetchCourses();
    fetchSupervisors();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProjects();
      setProjects(response.data);      
    } catch (error) {
      console.error('Error fetching projects:', error);
      showAlert('Error fetching projects', 'danger');
    }
    setIsLoading(false);
  }


  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await getSupervisors();
      setSupervisors(response.data);
    } catch (error) {
      console.error('Error fetching supervisors:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles(prevFiles => ({
      ...prevFiles,
      [name]: files[0] || null // ใช้ไฟล์ใหม่ถ้ามี มิฉะนั้นให้เป็น null
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      year: '',
      semester: '',
      status: 0,
      courseId: '',
      supervisorId: '',
      userIds: [],
    });
    setFiles({
      proposalFile: null,
      fullDocumentFile: null,
      imageFile: null,
    });
  };

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createProject(formData, files);
      showAlert('Project created successfully');
      fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating project:', error);
      showAlert('Error creating project', 'danger');
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateProject(selectedProject.id, formData, files);
      showAlert('Project updated successfully');
      fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating project:', error);
      showAlert('Error updating project', 'danger');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      try {
        await deleteProject(id);
        showAlert('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        showAlert('Error deleting project', 'danger');
      }
      setIsLoading(false);
    }
  };

  const openModal = async (mode, project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        year: project.year,
        semester: project.semester,
        status: project.status,
        courseId: project.course.id,
        supervisorId: project.supervisor.id,
        userIds: project.projectStudents.map(ps => ps.user.id),
      });
      await fetchFileMetadata(project.id);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const fetchFileMetadata = async (projectId) => {
    try {
      const response = await getFileMetadata(projectId);
      setFileMetadata(response.data);
    } catch (error) {
      console.error('Error fetching file metadata:', error);
    }
  };

  const handleFileDownload = async (url, filename) => {
    try {
      const response = await downloadFile(url);
      const urlObject = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlObject;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleUserChange = (selectedOptions) => {
    // Map selected options to get userIds
    const selectedUserIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({
      ...formData,
      userIds: selectedUserIds
    });
  }

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prevSelected => {
      if (prevSelected.includes(projectId)) {
        return prevSelected.filter(id => id !== projectId);
      } else {
        return [...prevSelected, projectId];
      }
    });
  };

  const handleChangeStatus = async () => {
    try {
      const response = await changeMultipleProjectStatuses(selectedProjects);
      setProjects(response.data);
      setAlert({ show: true, message: 'Project statuses updated successfully', variant: 'success' });
      fetchProjects(); // Reload all projects after status update
    } catch (error) {
      console.error('Error updating project statuses:', error);
      setAlert({ show: true, message: 'Failed to update project statuses', variant: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h1>Project Management</h1>
      <Button variant="primary" onClick={() => openModal('create')} className="mb-3">
        Create New Project
      </Button>
      <Button variant="success" onClick={handleChangeStatus} className="mb-3 mx-3">
        Apply Changes
      </Button>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Change Status</th>
              <th>Image</th>
              <th>Name</th>
              <th>Course</th>
              <th>Supervisor</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleSelectProject(project.id)}
                  />
                </td>
                <td> <img src={'http://localhost:8080/api/projects/' + project.id + '/files/image'} alt="project"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> </td>
                <td>{project.name}</td>
                <td>{project.course?.name}</td>
                <td>{project.supervisor?.name}</td>
                <td>{project.year}</td>
                <td>{project.semester}</td>
                <td>{project.status === 1 ? 'อนุมัติ' : 'กำลังพิจารณา'}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => openModal('view', project)} className="me-2">
                    View
                  </Button>
                  <Button variant="warning" size="sm" onClick={() => openModal('edit', project)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode.charAt(0).toUpperCase() + modalMode.slice(1)} Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Supervisor</Form.Label>
              <Form.Select
                name="supervisorId"
                value={formData.supervisorId}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              >
                <option value="">Select Supervisor</option>
                {supervisors.map(supervisor => (
                  <option key={supervisor.id} value={supervisor.id}>{supervisor.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Users</Form.Label>
              <Select
                isMulti // สำหรับเลือกหลายผู้ใช้
                name="userIds"
                value={users.filter(user => formData.userIds.includes(user.id)).map(user => ({ value: user.id, label: user.username }))}
                onChange={handleUserChange}
                options={users.map(user => ({ value: user.id, label: user.username }))}
                isDisabled={modalMode === 'view'}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>
            {modalMode === 'create' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Proposal File</Form.Label>
                  <Form.Control
                    type="file"
                    name="proposalFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Document File</Form.Label>
                  <Form.Control
                    type="file"
                    name="fullDocumentFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    type="file"
                    name="imageFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </>
            )}
            {modalMode === 'edit' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Proposal File</Form.Label>
                  <Form.Control
                    type="file"
                    name="proposalFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Document File</Form.Label>
                  <Form.Control
                    type="file"
                    name="fullDocumentFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    type="file"
                    name="imageFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </>
            )}
          </Form>
          {modalMode === 'view' && fileMetadata.length > 0 && (
            <div className="mt-4">
              <h5>Download Files</h5>
              <ul>
                {fileMetadata.map(file => (
                  <li key={file.filePath}>
                    {file.fileType === 'proposal' ? (
                      <>
                        <strong>Proposal File: </strong>
                        <a href="#" onClick={() => handleFileDownload(file.filePath, file.filename)}>
                          {file.filename}
                        </a>
                      </>
                    ) : file.fileType === 'fulldocument' ? (
                      <>
                        <strong>Full Document File: </strong>
                        <a href="#" onClick={() => handleFileDownload(file.filePath, file.filename)}>
                          {file.filename}
                        </a>
                      </>
                    ) : file.fileType === 'image' ? (
                      <>
                        <strong>Image: </strong>
                        <img src={file.filePath} alt={file.filename} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modalMode === 'edit' && fileMetadata.length > 0 && (
            <div className="mt-4">
              <h5>Latest Files</h5>
              <ul>
                {fileMetadata.map(file => (
                  <li key={file.filePath}>
                    {file.fileType === 'proposal' ? (
                      <>
                        <strong>Proposal File: </strong>
                        <a href="#" onClick={() => handleFileDownload(file.filePath, file.filename)}>
                          {file.filename}
                        </a>
                      </>
                    ) : file.fileType === 'fulldocument' ? (
                      <>
                        <strong>Full Document File: </strong>
                        <a href="#" onClick={() => handleFileDownload(file.filePath, file.filename)}>
                          {file.filename}
                        </a>
                      </>
                    ) : file.fileType === 'image' ? (
                      <>
                        <strong>Image: </strong>
                        <img src={file.filePath} alt={file.filename} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {modalMode === 'create' && (
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          )}
          {modalMode === 'edit' && (
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectCrud;
