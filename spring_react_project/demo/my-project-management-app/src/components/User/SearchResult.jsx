import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query params from the URL
    const queryParams = new URLSearchParams(location.search);

    const projectName = queryParams.get('projectName') || '';
    const courseName = queryParams.get('courseName') || '';
    const courseCode = queryParams.get('courseCode') || '';
    const academicYear = queryParams.get('academicYear') || '';

    // Perform your search logic here, e.g., fetching data from an API
    const projects = [
      {id: 1, projectName: 'Project 1', courseName: 'Course A', courseCode: 'C001', academicYear: '2023' },
      {id: 2, projectName: 'Project 2', courseName: 'Course B', courseCode: 'C002', academicYear: '2024' },
    ];

    const filteredResults = projects.filter((item) => {
      return (
        (projectName === '' || item.projectName.includes(projectName)) &&
        (courseName === '' || item.courseName.includes(courseName)) &&
        (courseCode === '' || item.courseCode.includes(courseCode)) &&
        (academicYear === '' || item.academicYear.includes(academicYear))
      );
    });

    setResults(filteredResults);
  }, [location.search]);


  const handleDetailClick = (id) => {
    navigate(`/projects/${id}`);  // นำทางไปยัง URL ที่มี id ของโปรเจค
};

  return (
    <div className='container mt-4'>
      <h3 className="prompt-semibold fs-2">ผลการค้นหา</h3>
      <div className="row">
          {results.map((result)  => (
            <div className="col-md-4" key={result.id}>
              <Card className="mb-4 mt-4">
                <Card.Body>
                  <Card.Title className='prompt-semibold'>{result.projectName}</Card.Title>
                  <Card.Title className='prompt-regular fs-6'>{result.courseCode}</Card.Title>
                  <Card.Title className='prompt-regular fs-6'>{result.courseName}</Card.Title>
                  <Card.Title className='prompt-regular fs-6'>{result.academicYear}</Card.Title>
                  <Button onClick={() => handleDetailClick(result.id)} className='prompt-regular' variant="primary">ดูรายละเอียด</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
    </div>
    
  );
};

export default SearchResult;
