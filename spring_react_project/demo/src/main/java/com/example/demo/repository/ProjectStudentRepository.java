package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.demo.model.ProjectStudent;

@Repository
public interface ProjectStudentRepository extends CrudRepository<ProjectStudent, Integer> {
    public List<ProjectStudent> findByProjectId(int projectId);
}
