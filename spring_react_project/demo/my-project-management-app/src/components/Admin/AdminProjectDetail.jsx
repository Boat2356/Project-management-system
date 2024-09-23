import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Modal, Alert, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import {
    getAllProjects, getProjectById, createProject, updateProject,
    deleteProject, changeProjectStatus, getFileMetadata, downloadFile
} from '../../services/ProjectService';
import { getSupervisors } from '../../services/SupervisorService';
import { getCourses } from '../../services/CourseService';
import { getUsers } from '../../services/UserService';
import Select from 'react-select';

const AdminProjectDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
    const [fileMetadata, setFileMetadata] = useState([]);
    const [courses, setCourses] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState({
        id: '',
        name: '',
        description: '',
        status: 0,
        year: '',
        semester: '',
        course: { id: '' },
        supervisor: { id: '' },
        userIds: []
    });

    const [formData, setFormData] = useState({
        userIds: []
    });

    useEffect(() => {
        fetchCourses();
        fetchSupervisors();
        fetchUsers();
        fetchProjectDetails();
    }, []);

    const [files, setFiles] = useState({
        proposalFile: null,
        fullDocumentFile: null,
        imageFile: null
    });

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

    const fetchFileMetadata = async (projectId) => {
        try {
            const response = await getFileMetadata(projectId);
            setFileMetadata(response.data);
        } catch (error) {
            console.error('Error fetching file metadata:', error);
        }
    };

    const fetchProjectDetails = async () => {
        setIsLoading(true);
        try {
            const response = await getProjectById(id);
            // Ensure users are set in the correct format
            const projectData = response.data;
            setProject(projectData);
            setFormData({
                ...formData,
                userIds: projectData.projectStudents?.map(ps => ps.user.id) || []
            });
            await fetchFileMetadata(id);
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setIsLoading(false);
        }
    };



    const showAlert = (message, variant = 'success') => {
        setAlert({ show: true, message, variant });
        setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>No project found.</div>;
    }

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUserChange = (selectedOptions) => {
        const selectedUserIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({
            ...formData,
            userIds: selectedUserIds
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProject(id, project, files);
            alert('Project updated successfully');
            fetchProjectDetails(); // Refresh project details
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project');
        }
    };

    return (

        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '75rem' }}>
            <Card.Body className='ms-5'>
                <Form onSubmit={handleSubmit}>
                    <h3 className='prompt-semibold text-primary mb-5'>รายละเอียดโปรเจคนักศึกษา</h3>

                    {/* ชื่อโปรเจค */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">ชื่อโปรเจค:</Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                type="text"
                                name="name"
                                value={project.name}
                                onChange={handleChange}
                                className="prompt-regular"
                                disabled
                            />
                        </div>
                    </Form.Group>

                    {/* คำอธิบาย */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">คำอธิบาย:</Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                className="prompt-regular"
                                disabled
                            />
                        </div>
                    </Form.Group>

                    {/* ปีการศึกษา */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">ปีการศึกษา:</Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                type="text"
                                name="year"
                                value={project.year}
                                onChange={handleChange}
                                className="prompt-regular"
                                disabled
                            />
                        </div>
                    </Form.Group>

                    {/* เทอม */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">เทอม:</Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                type="text"
                                name="semester"
                                value={project.semester}
                                onChange={handleChange}
                                className="prompt-regular"
                                disabled
                            />

                        </div>
                    </Form.Group>

                    {/* รายวิชา */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">รายวิชา:</Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                as="select"
                                name="course_code"
                                value={project.course.id}
                                onChange={handleChange}
                                className="prompt-regular"
                                disabled
                            >
                                <option value="">รายวิชา</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </Form.Control>
                        </div>
                    </Form.Group>

                    {/* อาจารย์ที่ปรึกษา */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">อาจารย์ที่ปรึกษา:</Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                as="select"
                                name="supervisorId"
                                value={project.supervisor.id}
                                onChange={handleChange}
                                className="prompt-regular"
                                disabled
                            >
                                <option value="">อาจารย์ที่ปรึกษา</option>
                                {supervisors.map(supervisor => (
                                    <option key={supervisor.id} value={supervisor.id}>{supervisor.name}</option>
                                ))}
                            </Form.Control>
                        </div>
                    </Form.Group>

                    {/* สมาชิก */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">สมาชิก:</Form.Label>
                        <div className="col-sm-8">
                            <Select
                                isMulti // สำหรับเลือกหลายผู้ใช้
                                name="userIds"
                                value={users.filter(user => formData.userIds.includes(user.id)).map(user => ({ value: user.id, label: user.username }))}
                                onChange={handleUserChange}
                                options={users.map(user => ({ value: user.id, label: user.username }))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                isDisabled
                            />
                        </div>
                    </Form.Group>

                    {/* ไฟล์ */}
                    <Form.Group className='row mb-3'>
                        <Form.Label className="col-sm-3 prompt-semibold">ไฟล์:</Form.Label>
                        <div className="col-sm-8">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ชื่อไฟล์</th>
                                        <th>ดาวน์โหลด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {fileMetadata.map(file => (
                            <tr key={file.filePath}>
                                <td>
                                    {file.fileType === 'proposal' && <strong>Proposal File</strong>}
                                    {file.fileType === 'fulldocument' && <strong>Full Document File</strong>}
                                    {file.fileType === 'image' && <strong>Image</strong>}
                                </td>
                                <td>
                                    {file.fileType === 'image' ? (
                                        <img src={file.filePath} alt={file.filename} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    ) : (
                                        <a href="#" onClick={() => handleFileDownload(file.filePath, file.filename)}>
                                            {file.filename}
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </Form.Group>
                    
                    {/* ปุ่มกลับไปยังหน้าหลัก */}
                    <div className='prompt-regular mt-4'>
                        <Link to="/admin/manage-project">
                            <Button variant="secondary" className="me-2">กลับไปยังหน้าหลัก</Button>
                        </Link>                        
                    </div>
                </Form>
            </Card.Body>
        </Card>

    )
}

export default AdminProjectDetail
