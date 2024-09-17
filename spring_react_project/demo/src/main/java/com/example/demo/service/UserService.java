package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.example.demo.repository.ProjectStudentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.model.Project;
import com.example.demo.model.ProjectStudent;
import com.example.demo.model.User;
import java.util.Set;
import java.util.HashSet;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectStudentRepository projectStudentRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // get all users
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    // get user by id
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    // save user
    public User save(User user) {
        return userRepository.save(user);
    }

    // update user
    public User updateUser(int id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        return userRepository.save(existingUser);        
    }

    // delete user
    public String deleteUser(int id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    public Set<ProjectStudent> mapUsersToProjectStudents(List<Integer> userIds, Project project) {
        Set<ProjectStudent> projectStudents = new HashSet<>();

        for (Integer userId : userIds) {
            User user = userRepository.findById(userId).orElse(null);

            ProjectStudent projectStudent = new ProjectStudent();
            projectStudent.setUser(user);
            projectStudent.setProject(project);

            // Persist the ProjectStudent entity
            projectStudentRepository.save(projectStudent);

            projectStudents.add(projectStudent);
        }

        return projectStudents;
    }

}
