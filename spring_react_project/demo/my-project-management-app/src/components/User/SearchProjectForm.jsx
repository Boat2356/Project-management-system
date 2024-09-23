import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { searchProjects } from '../../services/ProjectService';
import { getCourses } from '../../services/CourseService';
import Select from 'react-select';

const SearchProjectForm = () => {
    const [searchParams, setSearchParams] = useState({
        projectName: '',
        courseCode: '',
        courseName: '',
        year: '',
    });
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [searchMessage, setSearchMessage] = useState('');
    const [messageVariant, setMessageVariant] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response.data.map(course => ({ value: course.name, label: course.name })));
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        // Check for empty search parameters
        if (!searchParams.projectName && !searchParams.courseCode && !searchParams.courseName && !searchParams.year) {
            setSearchMessage('Error: ไม่พบโปรเจคที่ต้องการ (กรุณากรอกข้อมูล)');
            setMessageVariant('danger');
            return;
        }
        try {
            const response = await searchProjects(
                searchParams.projectName,
                searchParams.courseCode,
                searchParams.courseName,
                searchParams.year
            );
            setProjects(response.data);
            setSearchParams({
                projectName: '',
                courseCode: '',
                courseName: '',
                year: '',
            });

            if (response.data.length === 0) {
                setSearchMessage('ไม่พบโปรเจคที่ต้องการ');
                setMessageVariant('danger');
            } else {
                setSearchMessage(`พบโปรเจค ${response.data.length} รายการ`);
                setMessageVariant('success');
            }
        } catch (error) {
            console.error('Error searching projects:', error);
            setSearchMessage('เกิดข้อผิดพลาดในการค้นหา โปรดลองอีกครั้ง');
            setMessageVariant('danger');
        }
    };

    const handleCardClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        // Clear message after 3 seconds
        if (searchMessage) {
            const timer = setTimeout(() => {
                setSearchMessage('');
            }, 3000); // 3000 milliseconds = 3 seconds

            return () => clearTimeout(timer); // Cleanup the timer on unmount or message change
        }
    }, [searchMessage]);

    const handleSelectChange = (selectedOption) => {
        setSearchParams({ ...searchParams, courseName: selectedOption ? selectedOption.value : '' });
    };

    // Calculate the current year and create an array of years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i + 543); // 11 years from (currentYear - 5) to (currentYear + 5)

    return (
        <Container className="mt-4">
        <div className="container mt-4">
            <h3 className='prompt-semibold text-primary mb-4'>ค้นหาโปรเจคนักศึกษา</h3>
            <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3 row">
                    <Form.Label className='prompt-semibold col-sm-2 col-form-label'>ชื่อโปรเจค</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            className='prompt-regular'
                            type="text"
                            name="projectName"
                            value={searchParams.projectName}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row">
                    <Form.Label className='prompt-semibold col-sm-2 col-form-label'>รหัสวิชา</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            className='prompt-regular'
                            type="text"
                            name="courseCode"
                            value={searchParams.courseCode}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row">
                    <Form.Label className='prompt-semibold col-sm-2 col-form-label'>ชื่อวิชา</Form.Label>
                    <div className="col-sm-10">
                        <Select
                            className='prompt-regular'
                            options={courses}
                            onChange={handleSelectChange}
                            isClearable
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row">
                        <Form.Label className='prompt-semibold col-sm-2 col-form-label'>ปี</Form.Label>
                        <div className="col-sm-10">
                            <Form.Select
                                className='prompt-regular'
                                name="year"
                                value={searchParams.year}
                                onChange={handleChange}
                            >
                                <option value="">เลือกปี</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>

                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>

            {searchMessage && (
                    <Alert className="mt-4" variant={messageVariant}>
                        {searchMessage}
                    </Alert>
                )}

            <Row className="mt-4">
                {projects.map((project) => (
                    <Col key={project.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card onClick={() => handleCardClick(project.id)} style={{ cursor: 'pointer' }}>
                            <Card.Body>
                                <Card.Title className='prompt-semibold'>{project.name}</Card.Title>
                                <hr />
                                <Card.Text>
                                    <p class="prompt-regular card-text">ชื่อวิชา: {project.course.name}</p> 
                                    <p class="prompt-regular card-text">รหัสวิชา: {project.course.courseCode}</p> 
                                    <p class="prompt-regular card-text">ปีการศึกษา: {project.year}</p> 
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleCardClick(project.id)}>
                                    ดูรายละเอียด
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
        </Container>
    );
};

export default SearchProjectForm;