package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Project;
import com.example.demo.model.ProjectStudent;
import com.example.demo.model.User;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.ProjectStudentRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ProjectStudentService {    
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectStudentRepository projectStudentRepository;

    public ProjectStudent addProjectStudent(int projectId, int userId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (projectOpt.isPresent() && userOpt.isPresent()) {
            Project project = projectOpt.get();
            User user = userOpt.get();

            ProjectStudent projectStudent = new ProjectStudent();
            projectStudent.setProject(project);
            projectStudent.setUser(user);
            projectStudent.setSubmissionDate(LocalDateTime.now());

            return projectStudentRepository.save(projectStudent);
        } else {
            throw new RuntimeException("Project or Student not found");
        }
    }

    public void removeProjectStudent(int projectStudentId) {
        projectStudentRepository.deleteById(projectStudentId);
    }

    public Set<ProjectStudent> getProjectStudentsByProjectId(int projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isPresent()) {
            return projectOpt.get().getProjectStudents().stream().map(
                projectStudent -> {
                    ProjectStudent newProjectStudent = new ProjectStudent();
                    newProjectStudent.setUser(projectStudent.getUser());
                    newProjectStudent.setId(projectStudent.getId());
                    newProjectStudent.setSubmissionDate(projectStudent.getSubmissionDate());                 
                    return newProjectStudent;
                }
            ).collect(Collectors.toSet());
        } else {
            throw new RuntimeException("Project not found");
        }
    }
    public Set<ProjectStudent> getProjectStudentsByStudentId(int userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return userOpt.get().getProjectStudents();
        } else {
            throw new RuntimeException("Student not found");
        }
    }
}
