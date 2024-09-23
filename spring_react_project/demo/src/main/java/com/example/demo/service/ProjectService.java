package com.example.demo.service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.example.demo.model.Course;
import com.example.demo.model.FileMetadata;
import com.example.demo.model.Project;
import com.example.demo.model.ProjectStudent;
import com.example.demo.model.Supervisor;
import com.example.demo.model.User;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.ProjectStudentRepository;
import com.example.demo.repository.SupervisorRepository;
import com.example.demo.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProjectService {
    @Autowired
    private final ProjectRepository projectRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private SupervisorRepository supervisorRepository;    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectStudentRepository projectStudentRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return (List<Project>) projectRepository.findAll();
    }
    public Optional<Project> getProjectsById(int id) {
        return projectRepository.findById(id);
    }        
    
    public Project save(Project project) {
        return projectRepository.save(project);
    }

    public Project createProjectWithFiles(Project project, int course_code, int supervisorId, 
                                          List<Integer> userIds, MultipartFile proposalFile, 
                                          MultipartFile fullDocumentFile, MultipartFile imageFile) 
                                          throws IOException {
        Course course = courseRepository.findById(course_code).orElseThrow(null);
        Supervisor supervisor = supervisorRepository.findById(supervisorId).orElseThrow(null);          
        project.setCourse(course);
        project.setSupervisor(supervisor);      
        project.setStatus(0); // Set a default or required status
        if (proposalFile != null && !proposalFile.isEmpty()) {
            project.setProposalFile(proposalFile.getBytes());
            project.setProposalfilename(proposalFile.getOriginalFilename());
        }
        
        if (fullDocumentFile != null && !fullDocumentFile.isEmpty()) {
            project.setFulldocumentFile(fullDocumentFile.getBytes());
            project.setFulldocumentfilename(fullDocumentFile.getOriginalFilename());
        }
        
        if (imageFile != null && !imageFile.isEmpty()) {
            project.setImage(imageFile.getBytes());
            project.setImagefilename(imageFile.getOriginalFilename());
        }
        
        Project savedProject = projectRepository.save(project);
        
        for (Integer userId : userIds) {
            User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
            ProjectStudent projectStudent = new ProjectStudent();
            projectStudent.setProject(savedProject);
            projectStudent.setUser(user);
            projectStudent.setSubmissionDate(LocalDateTime.now()); // Set a default or required date    
            projectStudentRepository.save(projectStudent); // Save each ProjectStudent
        }        
        return savedProject;
    }

    public Project updateProjectWithFiles(Project project, int id, int course_code, int supervisorId, 
                                          List<Integer> userIds, MultipartFile proposalFile, 
                                          MultipartFile fullDocumentFile, MultipartFile imageFile) 
                                          throws IOException {
        Project existingProject = projectRepository.findById(id).orElseThrow(null);
        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setStatus(project.getStatus());
        existingProject.setYear(project.getYear());
        existingProject.setSemester(project.getSemester());
        Course course = courseRepository.findById(course_code).orElseThrow(null);
        Supervisor supervisor = supervisorRepository.findById(supervisorId).orElseThrow(null);
        existingProject.setCourse(course);
        existingProject.setSupervisor(supervisor);
        
        if (proposalFile != null && !proposalFile.isEmpty()) {
            existingProject.setProposalFile(proposalFile.getBytes());
            existingProject.setProposalfilename(proposalFile.getOriginalFilename());
        }
        
        if (fullDocumentFile != null && !fullDocumentFile.isEmpty()) {
            existingProject.setFulldocumentFile(fullDocumentFile.getBytes());
            existingProject.setFulldocumentfilename(fullDocumentFile.getOriginalFilename());
        }
        
        if (imageFile != null && !imageFile.isEmpty()) {
            existingProject.setImage(imageFile.getBytes());
            existingProject.setImagefilename(imageFile.getOriginalFilename());
        }
        
        Project savedProject = projectRepository.save(existingProject);      
        
        // Get the current list of ProjectStudent associations
    List<ProjectStudent> currentAssociations = projectStudentRepository.findByProjectId(id);
    
    // Create a set of new user IDs for quick lookup
    Set<Integer> newUserIdSet = new HashSet<Integer>(userIds);
    
    // Determine users to be added and removed
    Set<Integer> currentUserIds = currentAssociations.stream()
                                                     .map(ps -> ps.getUser().getId())
                                                     .collect(Collectors.toSet());
    
    // Users to be removed
    Set<Integer> usersToRemove = currentUserIds.stream()
                                               .filter(userId -> !newUserIdSet.contains(userId))
                                               .collect(Collectors.toSet());
    
    // Users to be added
    Set<Integer> usersToAdd = newUserIdSet.stream()
                                              .filter(newId -> !currentUserIds.contains(newId))
                                              .collect(Collectors.toSet());
    
    // Remove users that are no longer in the list
    for (Integer userId : usersToRemove) {
        ProjectStudent projectStudent = currentAssociations.stream()
            .filter(ps -> Integer.valueOf(ps.getUser().getId()).equals(userId))
            .findFirst()
            .orElse(null);
        if (projectStudent != null) {
            projectStudentRepository.delete(projectStudent);
        }
    }
    
    // Add new users
    for (Integer userId : usersToAdd) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        ProjectStudent projectStudent = new ProjectStudent();
        projectStudent.setProject(savedProject);
        projectStudent.setUser(user);
        projectStudent.setSubmissionDate(LocalDateTime.now()); // Set a default or required date    
        projectStudentRepository.save(projectStudent); // Save each ProjectStudent
    }
             
        return savedProject;
    }



    public void deleteProjectById(int id) {
        projectRepository.deleteById(id);        
    }
    public Project deleteProject(int projectId,int supervisorId,int course_code) {
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<Supervisor> supervisor = supervisorRepository.findById(supervisorId);
        Optional<Course> course = courseRepository.findById(course_code);
        if(project.isPresent() && supervisor.isPresent() && course.isPresent()){
            projectRepository.deleteById(projectId);
            return project.get();
        }else{
            throw new RuntimeException("Project or Supervisor or Course not found");
        }
    }

    public byte[] getProposalFile(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("Project not found"));
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
                String fileProposalDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/projects/")
                    .path(String.valueOf(projectId))
                    .path("/files/proposal")
                    .toUriString();     
                fileMetadataList.add(new FileMetadata(
                        project.getProposalfilename(),
                        fileProposalDownloadUri,
                        "proposal"
                ));
            }

            if (project.getFulldocumentFile() != null) {
                String fileFullDocumentDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/projects/")
                    .path(String.valueOf(projectId))
                    .path("/files/fulldocument")
                    .toUriString();
                fileMetadataList.add(new FileMetadata(
                        project.getFulldocumentfilename(),
                        fileFullDocumentDownloadUri,
                        "fulldocument"
                        //"/api/projects/" + projectId + "/files/fulldocument"
                ));
            }

            if (project.getImage() != null) {
                String fileImageDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/projects/")
                    .path(String.valueOf(projectId))
                    .path("/files/image")
                    .toUriString();
                fileMetadataList.add(new FileMetadata(
                        project.getImagefilename(),
                        fileImageDownloadUri,
                        "image"
                        //"/api/projects/" + projectId + "/files/image"
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

    // Change unapproved projects to approved or vice versa
    public Project toggleApproval(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("Project not found"));
        project.setStatus(project.getStatus() == 0 ? 1 : 0);
        return projectRepository.save(project);
    }

    // toggle approval for multiple projects
    public List<Project> toggleApprovalForProjects(List<Integer> projectIds) {
        List<Project> projects = (List<Project>) projectRepository.findAllById(projectIds);
        for (Project project : projects) {
            project.setStatus(project.getStatus() == 0 ? 1 : 0);
        }
        return (List<Project>) projectRepository.saveAll(projects);
    }    

}
