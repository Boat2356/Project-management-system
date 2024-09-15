package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Course;
import com.example.demo.model.FileMetadata;
import com.example.demo.model.Project;
import com.example.demo.model.Supervisor;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.SupervisorRepository;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private SupervisorRepository supervisorRepository;    

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return (List<Project>) projectRepository.findAll();
    }
    public Project getProjectsById(int id) {
        return projectRepository.findById(id).orElse(null);
    }        
    
    public Project save(Project project) {
        return projectRepository.save(project);
    }

    public Project addProject(Project project,int courseId, int supervisorId) throws IOException {      
        Optional<Course> course = courseRepository.findById(courseId); 
        Optional<Supervisor> supervisor = supervisorRepository.findById(supervisorId);
        if(course.isPresent() && supervisor.isPresent()){
            project.setCourse(course.get());
            project.setSupervisor(supervisor.get());
        }else{
            throw new RuntimeException("Course or Supervisor not found");
        }    
        return projectRepository.save(project);       
                
    }
    
    public Project updateProject(Project project, int id) throws IOException {
        Project existingProject = projectRepository.findById(id).orElse(null);
        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setisapproved(project.isapproved());
        existingProject.setYear(project.getYear());
        existingProject.setSemester(project.getSemester());
        Course course = project.getCourse();
        Supervisor supervisor = project.getSupervisor();
        if(course != null){
            existingProject.setCourse(course);
        }
        if(supervisor != null){
            existingProject.setSupervisor(supervisor);
        }              
        return projectRepository.save(existingProject);
        
    }
    public void deleteProjectById(int id) {
        projectRepository.deleteById(id);        
    }
    public Project deleteProject(int projectId,int supervisorId,int courseId) {
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<Supervisor> supervisor = supervisorRepository.findById(supervisorId);
        Optional<Course> course = courseRepository.findById(courseId);
        if(project.isPresent() && supervisor.isPresent() && course.isPresent()){
            projectRepository.deleteById(projectId);
            return project.get();
        }else{
            throw new RuntimeException("Project or Supervisor or Course not found");
        }
    }

    public byte[] getProposalFile(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();              
        return project.getProposalFile();
    }

    public byte[] getFullDocumentFile(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        return project.getFulldocumentFile();
    }

    public byte[] getImage(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        return project.getImage();
    }
    /* 
    public void uploadFile(int projectId, MultipartFile file, String fileType) throws IOException {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            switch (fileType) {
                case "proposal":
                    project.setProposalFile(file.getBytes());
                    project.setProposalfilename(file.getOriginalFilename());
                    break;
                case "fulldocument":
                    project.setFulldocumentFile(file.getBytes());
                    project.setFulldocumentfilename(file.getOriginalFilename());
                    break;
                case "image":
                    project.setImage(file.getBytes());
                    project.setImagefilename(file.getOriginalFilename());
                    break;
                default:
                    throw new IllegalArgumentException("Invalid file type");
            }
            projectRepository.save(project);
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }*/
    public void uploadFiles(int projectId, Map<String, MultipartFile> files) throws IOException {
    Optional<Project> optionalProject = projectRepository.findById(projectId);
    if (optionalProject.isPresent()) {
        Project project = optionalProject.get();

        MultipartFile proposalFile = files.get("proposal");
        if (proposalFile != null) {
            project.setProposalFile(proposalFile.getBytes());
            project.setProposalfilename(proposalFile.getOriginalFilename());
        }

        MultipartFile fulldocumentFile = files.get("fulldocument");
        if (fulldocumentFile != null) {
            project.setFulldocumentFile(fulldocumentFile.getBytes());
            project.setFulldocumentfilename(fulldocumentFile.getOriginalFilename());
        }

        MultipartFile imageFile = files.get("image");
        if (imageFile != null) {
            project.setImage(imageFile.getBytes());
            project.setImagefilename(imageFile.getOriginalFilename());
        }

        projectRepository.save(project);
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }
    /* 
    public ResponseEntity<byte[]> downloadFile(int projectId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();

            byte[] fileContent = null;
            String filename = null;
            String contentType = null;

            if (project.getProposalFile() != null) {
                fileContent = project.getProposalFile();
                filename = project.getProposalfilename();
                contentType = "application/pdf"; // Adjust based on actual file type
            } else if (project.getFulldocumentFile() != null) {
                fileContent = project.getFulldocumentFile();
                filename = project.getFulldocumentfilename();
                contentType = "application/pdf"; // Adjust based on actual file type
            } else if (project.getImage() != null) {
                fileContent = project.getImage();
                filename = project.getImagefilename();
                contentType = "image/jpeg"; // Adjust based on actual file type
            } else {
                throw new RuntimeException("No file found for project with id: " + projectId);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
            headers.set(HttpHeaders.CONTENT_TYPE, contentType);

            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }*/

    public ResponseEntity<List<FileMetadata>> getFileMetadata(int projectId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();

            List<FileMetadata> fileMetadataList = new ArrayList<>();

            if (project.getProposalFile() != null) {
                fileMetadataList.add(new FileMetadata(
                        project.getProposalfilename(),
                        "/api/projects/" + projectId + "/files/proposal"
                ));
            }

            if (project.getFulldocumentFile() != null) {
                fileMetadataList.add(new FileMetadata(
                        project.getFulldocumentfilename(),
                        "/api/projects/" + projectId + "/files/fulldocument"
                ));
            }

            if (project.getImage() != null) {
                fileMetadataList.add(new FileMetadata(
                        project.getImagefilename(),
                        "/api/projects/" + projectId + "/files/image"
                ));
            }

            if (fileMetadataList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(fileMetadataList);
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }


}
