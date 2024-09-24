import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../../services/ProjectService';
import { getSupervisors } from '../../services/SupervisorService';
import { getCourses } from '../../services/CourseService';
import { getUsers } from '../../services/UserService';
import { getFileMetadata, downloadFile, changeProjectStatus, changeMultipleProjectStatuses } from '../../services/ProjectService';
import Select from 'react-select';


const AdminManageProject = () => {
    const navigate = useNavigate();

    const handleNavigate = (projectId) => {
        navigate(`/admin/manage-project/project-detail/${projectId}`);  // กำหนด path ของหน้าใหม่ที่ต้องการ
    }

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
    const [newStatus, setNewStatus] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
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
        try {
            const response = await getAllProjects();
            const projectsData = response.data.map(project => ({
                ...project,
                status: project.status === 1
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);


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

    const handleDelete = (projectId) => {
        setProjectToDelete(projectId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProject(projectToDelete);
            setAlert({ show: true, message: 'Project deleted successfully', variant: 'success' });
            fetchProjects(); // Refresh projects
            setShowDeleteModal(false);
            setProjectToDelete(null);
            setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000); // Hide alert after 3 seconds
        } catch (error) {
            console.error('Error deleting project:', error);
            setAlert({ show: true, message: 'Failed to delete project', variant: 'danger' });
            setShowDeleteModal(false);
            setProjectToDelete(null);
            setTimeout(() => setAlert({ show: false, message: '', variant: 'danger' }), 3000); // Hide alert after 3 seconds
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProjectToDelete(null);
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
            setSelectedProjects([]); // Reset selected projects          
            setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000); // Hide alert after 3 seconds
        } catch (error) {
            console.error('Error updating project statuses:', error);
            setAlert({ show: true, message: 'Failed to update project statuses', variant: 'danger' });
            setTimeout(() => setAlert({ show: false, message: '', variant: 'danger' }), 3000); // Hide alert after 3 seconds
        }
    };

    return (

        <div className='mx-auto mt-4 ' style={{ width: '75rem' }}>
            <h3 className='prompt-semibold text-primary mb-4'>จัดการโปรเจคนักศึกษา</h3>
            {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false, message: '', variant: 'success' })} dismissible>{alert.message}</Alert>}
            <Button variant="success" onClick={handleChangeStatus} className="prompt-regular mb-3">
                บันทึกการเปลี่ยนแปลง
            </Button>
            {/* <Form>
                        <div className='row mt-4'>
                            <Form.Group className="mb-3 col-3" >
                                <Form.Control type="text" placeholder="ค้นหา" />
                            </Form.Group>
                            <Button className="mb-3 col-1" variant="primary" type="submit">
                                ค้นหา
                            </Button>
                        </div>
                    </Form> */}

            <Table bordered hover className='mt-4 '>
                <thead >
                    <tr >
                        <th className='prompt-semibold bg-body-tertiary'>เปลี่ยนสถานะ</th>
                        <th className='prompt-semibold bg-body-tertiary'>ชื่อโปรเจค</th>
                        <th className='prompt-semibold bg-body-tertiary'>รายวิชา</th>
                        <th className='prompt-semibold bg-body-tertiary'>สถานะ</th>
                        <th className='prompt-semibold bg-body-tertiary'>Action</th>
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
                                    style={{ transform: 'scale(1.5)' }} // Increase checkbox size
                                />
                            </td>
                            <td className='prompt-regular'>{project.name}</td>
                            <td className='prompt-regular'>{project.course.name}</td>
                            <td className='prompt-regular'>{project.status ? 'อนุมัติแล้ว' : 'รอการพิจารณา'}</td>
                            <td>

                                <Button className='prompt-regular me-2' variant='primary' onClick={() => handleNavigate(project.id)}>
                                    รายละเอียด
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                                ลบ
                            </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}
export default AdminManageProject;