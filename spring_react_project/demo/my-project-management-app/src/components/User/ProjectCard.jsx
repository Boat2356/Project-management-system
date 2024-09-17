import React from 'react'
import { Card, Button } from 'react-bootstrap';

//ของหน้า home page
const ProjectCard = () => {
    const projects = [
      { id: 1, name: 'Project A', description: 'Description A' },
      { id: 2, name: 'Project B', description: 'Description B' },
      { id: 3, name: 'Project C', description: 'Description B' },
      { id: 4, name: 'Project A', description: 'Description A' },
    ];
  
    return (
      <div className="container mt-5">
        
      <div>
      <Button className='mt-4 prompt-regular' variant="primary">ค้นหาโปรเจค</Button>{' '}
      </div>

        <div className="row ">
          {projects.map((project) => (
            <div className="col-md-4" key={project.id}>
              <Card className="mb-4 mt-4">
                <Card.Body>
                  <Card.Title className='prompt-semibold'>{project.name}</Card.Title>
                  <Card.Text className='prompt-regular'>{project.description}</Card.Text>
                  <Button className='prompt-regular' variant="primary">ดูรายละเอียด</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProjectCard;