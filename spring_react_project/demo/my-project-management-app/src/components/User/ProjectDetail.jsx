import React, { useState, useEffect } from 'react'
import { Card, Button, Form, Table, Modal, Alert, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getAllProjects, getProjectById, getFileMetadata, downloadFile } from '../../services/ProjectService';
import { getSupervisors } from '../../services/SupervisorService';
import { getCourses } from '../../services/CourseService';
import { getUsers } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
const ProjectDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
    const [fileMetadata, setFileMetadata] = useState([]);
    const [courses, setCourses] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [project, setProject] = useState({
        id: '',
        name: '',
        description: '',
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

    return (
        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem' }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-5'>รายละเอียดโปรเจค</h3>

                {/* ชื่อโปรเจค */}
                <div className='row mb-3 '>
                    <p className="col-sm-3 prompt-semibold">ชื่อโปรเจค:</p>
                    <p className="col-sm-8 prompt-regular" name="name"
                        value="{project.name}" onChange={handleChange}>{project.name}</p>
                </div>

                {/* คำอธิบาย */}
                <div className='row mb-3'>
                    <p className="col-sm-3 prompt-semibold">คำอธิบาย:</p>
                    <p className="col-sm-8 prompt-regular" name="description"
                        value="{project.description}" onChange={handleChange}>{project.description}</p>
                </div>

                {/* เอกสารเค้าโครง */}
                <div className='row mb-3'>
                    <p className="col-sm-3 prompt-semibold">เอกสารเค้าโครง:</p>
                    <div className="col-sm-8">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ชื่อไฟล์</th>
                                    <th>ดาวน์โหลด</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fileMetadata
                                    .filter(file => file.fileType === 'proposal')
                                    .map(file => (
                                        <tr key={file.filePath}>
                                            <td>
                                                <strong>Proposal File</strong>
                                            </td>
                                            <td>
                                                <a href="#" onClick={() => handleFileDownload(file.filePath, file.filename)}>
                                                    {file.filename}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* ปีการศึกษา และภาคการศึกษา */}
                <div className='row mb-3'>
                    <p className="col-sm-3 prompt-semibold">ปีการศึกษา:</p>
                    <p className="col-sm-2 prompt-regular" name="year"
                        value="{project.year}" onChange={handleChange}>{project.year}</p>

                    <p className="col-sm-2 prompt-semibold">ภาคการศึกษาที่:</p>
                    <p className="col-sm-2 prompt-regular" name="semester"
                        value="{project.semester}" onChange={handleChange}>{project.semester}</p>
                </div>

                {/* รหัสวิชา และรายวิชา */}
                <div className='row mb-3'>
                    <p className="col-sm-3 prompt-semibold">รหัสวิชา:</p>
                    <p className="col-sm-2 prompt-regular" name="courseCode"
                        value="{project.course.courseCode}" onChange={handleChange}>{project.course.courseCode}</p>

                    <p className="col-sm-1 prompt-semibold">รายวิชา:</p>
                    <p className="col-sm-2 prompt-regular" name="name"
                        value="{project.course.name}" onChange={handleChange}>{project.course.name}</p>
                </div>                
                {/* อาจารย์ที่ปรึกษา */}
                <div className='row mb-3'>
                    <p className="col-sm-3 prompt-semibold">อาจารย์ที่ปรึกษา:</p>
                    <p className="col-sm-8 prompt-regular" name="supervisor"
                        value="{project.supervisor.id}" onChange={handleChange}>{project.supervisor.name}</p>
                </div>

                {/* นักศึกษาที่เข้าร่วมโปรเจค */}
                <p className="col-sm-3 prompt-semibold">นักศึกษาที่เข้าร่วมโปรเจค:</p>
                {project && project.projectStudents && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ชื่อจริง</th>
                                <th>นามสกุล</th>
                                <th>รหัสนักศึกษา</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.projectStudents.map(student => (
                                <tr key={student.user.id}>
                                    <td>{student.user.firstName}</td>
                                    <td>{student.user.lastName}</td>
                                    <td>{student.user.student_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                <Button variant="primary" className='mt-4' onClick={() => window.history.back()}>กลับ</Button>

            </Card.Body>
        </Card>
    )
}

export default ProjectDetail
