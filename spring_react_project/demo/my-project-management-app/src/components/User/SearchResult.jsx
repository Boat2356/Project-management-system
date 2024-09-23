import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { searchProjects } from '../../services/ProjectService';

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Extract query params from the URL
        const queryParams = new URLSearchParams(location.search);

        const projectName = queryParams.get('projectName') || '';
        const courseName = queryParams.get('courseName') || '';
        const courseCode = queryParams.get('courseCode') || '';
        const year = queryParams.get('year') || '';

        // Perform your search logic here, e.g., fetching data from an API
        const fetchProjects = async () => {
            try {
                const response = await searchProjects(projectName, courseCode, courseName, year);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [location.search]);

    const handleCardClick = (projectId) => {
        navigate(`/projects/${projectId}${location.search}`);
    };

    return (
        <Container className="mt-4">
            <h1>Search Results</h1>
            <Row>
                {projects.map((project) => (
                    <Col key={project.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card onClick={() => handleCardClick(project.id)} style={{ cursor: 'pointer' }}>
                            <Card.Body>
                                <Card.Title>{project.name}</Card.Title>
                                <Card.Text>
                                    <strong>Course Name:</strong> {project.course.name}<br />
                                    <strong>Course Code:</strong> {project.course.courseCode}<br />
                                    <strong>Academic Year:</strong> {project.year}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleCardClick(project.id)}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SearchResult;