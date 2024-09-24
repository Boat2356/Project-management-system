import React, { useEffect, useState } from 'react'
import { Table, Button, Form, Modal, Alert, Spinner, Card } from 'react-bootstrap';
import { getSupervisors } from '../../services/SupervisorService';
import { getCourses } from '../../services/CourseService';
import { getUsers } from '../../services/UserService';
import { getFileMetadata, downloadFile, createProject } from '../../services/ProjectService';
import Select from 'react-select';


//เพิ่มโปรเจคนักศึกษา
const StdAddProject = () => {
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
    const [fileMetadata, setFileMetadata] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageVariant, setMessageVariant] = useState('info');
    const [showModal, setShowModal] = useState(false); // State for Modal

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        courseCode: '',
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
        fetchCourses();
        fetchSupervisors();
        fetchUsers();
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
            const filteredUsers = response.data.filter(user => user.role === 'USER');
            setUsers(filteredUsers);
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
            courseCode: '',
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
            showAlert('Project created successfully!', 'success');
            resetForm();
        } catch (error) {
            showAlert('Error creating project.', 'danger');
            console.error('Error creating project:', error);
        }
        setIsLoading(false);
    };

    const handleUserChange = (selectedOptions) => {
        // Map selected options to get userIds
        const selectedUserIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({
            ...formData,
            userIds: selectedUserIds
        });
    }

    const handleCourseChange = (selectedOption) => {
        const selectedCourse = courses.find(course => course.id === selectedOption.value);
        setFormData({
            ...formData,
            courseId: selectedOption ? selectedOption.value : '',
            courseCode: selectedCourse && selectedCourse.courseCode ? selectedCourse.courseCode : ''
        });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i + 543); // 11 years from (currentYear - 5) to (currentYear + 5)

    
    return (

        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '50rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>เพิ่มโปรเจคนักศึกษา</h3>
                {alert.show && (
                    <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                        {alert.message}
                    </Alert>
                )}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='prompt-semibold'>ชื่อโปรเจค</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='prompt-semibold'>คำอธิบาย</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <div className='row'>
                        <Form.Group controlId="formFile" className="mb-3 col-6">
                            <Form.Label className='prompt-semibold'>อัปโหลดเอกสารเค้าโครง</Form.Label>
                            <Form.Control
                                type="file"
                                name="proposalFile"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3 col-6">
                            <Form.Label className='prompt-semibold'>อัปโหลดเอกสารเต็ม</Form.Label>
                            <Form.Control
                                type="file"
                                name="fullDocumentFile"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>ปีการศึกษา</Form.Label>
                            <Form.Select
                                className='prompt-regular'
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                            >
                                <option value="">เลือกปี</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>ภาคการศึกษา</Form.Label>
                            <Form.Select
                                className='prompt-regular'
                                name="semester"
                                value={formData.semester}
                                onChange={handleInputChange}
                            >
                                <option value="">เลือกภาคการศึกษา</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>รหัสวิชา</Form.Label>
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                name="courseCode"
                                value={formData.courseCode}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>รายวิชา</Form.Label>
                            <Select
                                className='prompt-regular'
                                options={courses.map(course => ({ value: course.id, label: course.name }))}
                                onChange={handleCourseChange}
                                isClearable
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3" >
                        <Form.Label className='prompt-semibold'>อาจารย์ที่ปรึกษา</Form.Label>
                        <Form.Select
                            name="supervisorId"
                            value={formData.supervisorId}
                            onChange={handleInputChange}
                        >
                            <option value="">เลือกอาจารย์ที่ปรึกษา</option>
                            {supervisors.map(supervisor => (
                                <option key={supervisor.id} value={supervisor.id}>{supervisor.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* นักศึกษาที่เข้าร่วมโปรเจค */}
                    <Form.Group className="mb-3">
                        <Form.Label className='prompt-semibold'>นักศึกษาที่เข้าร่วมโปรเจค</Form.Label>
                        <Select
                            isMulti // สำหรับเลือกหลายผู้ใช้
                            name="userIds"
                            value={users.filter(user => formData.userIds.includes(user.id)).map(user => ({ value: user.id, label: user.username }))}
                            onChange={handleUserChange}
                            options={users.map(user => ({ value: user.id, label: user.username }))}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </Form.Group>
                    <Button className='prompt-regular' variant="primary" type="submit" onClick={handleCreate}>
                        บันทึก
                    </Button>
                </Form>


                {message && (
                    <Alert className="mt-4" variant={messageVariant}>
                        {message}
                    </Alert>
                )}
            </Card.Body>

        </Card>

    )
}
export default StdAddProject;