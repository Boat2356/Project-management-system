import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Extract query params from the URL
    const queryParams = new URLSearchParams(location.search);

    const projectName = queryParams.get('projectName') || '';
    const courseName = queryParams.get('courseName') || '';
    const courseCode = queryParams.get('courseCode') || '';
    const academicYear = queryParams.get('academicYear') || '';

    // Perform your search logic here, e.g., fetching data from an API
    const mockResults = [
      { projectName: 'Project 1', courseName: 'Course A', courseCode: 'C001', academicYear: '2023' },
      { projectName: 'Project 2', courseName: 'Course B', courseCode: 'C002', academicYear: '2024' },
    ];

    const filteredResults = mockResults.filter((item) => {
      return (
        (projectName === '' || item.projectName.includes(projectName)) &&
        (courseName === '' || item.courseName.includes(courseName)) &&
        (courseCode === '' || item.courseCode.includes(courseCode)) &&
        (academicYear === '' || item.academicYear.includes(academicYear))
      );
    });

    setResults(filteredResults);
  }, [location.search]);

  return (
    <div>
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
                  <Button className='prompt-regular' variant="primary">ดูรายละเอียด</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
    </div>
    
  );
};

export default SearchResult;
