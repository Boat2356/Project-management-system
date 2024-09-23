import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, getFileMetadata, downloadFile } from '../../services/ProjectService';

//ของหน้า home page
const ProjectCard = () => {   
    const [projects, setProjects] = useState([]);
    const [fileMetadata, setFileMetadata] = useState([]);  
    const navigate = useNavigate();

    useEffect(() => {
      fetchProjects();
  }, []);  

    const fetchProjects = async () => {
      try {
          const response = await getAllProjects();
          setProjects(response.data);
      } catch (error) {
          console.error('Error fetching projects:', error);
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

    const handleSearchClick = () =>{
      navigate("/search");
    }

    const handleDetailClick = async (projectId) => {
      await fetchFileMetadata(projectId);
      navigate(`/projects/${projectId}`);
  };

  const handleFileDownload = async (filePath, filename) => {
    try {
        const response = await downloadFile(filePath);
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

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
      return text;
  }
  return text.substring(0, maxLength) + '...';
};

    return (
      <div className="container mt-5">
        
      <div>
        <Button onClick={handleSearchClick} className='mt-4 prompt-regular' variant="primary">ค้นหาโปรเจค</Button>
      </div>

        <div className="row ">
          {projects.map((project) => (
            <div className="col-md-4" key={project.id}>
              <Card className="mb-4 mt-4">
                <Card.Body>
                  <Card.Title className='prompt-semibold'>{project.name}</Card.Title>
                  <Card.Text className='prompt-regular'>
                    {truncateText(project.description, 100)} {/* Limit description to 100 characters */}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleDetailClick(project.id)}>
                    ดูรายละเอียด
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProjectCard;