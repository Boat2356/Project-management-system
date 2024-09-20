package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    public List<Course> getAllCourses() {
        return (List<Course>) courseRepository.findAll();
    }
    public Course getCourseById(int id) {
        return courseRepository.findById(id).orElse(null);
    }
    public Course save(Course course) {
        return courseRepository.save(course);
    }
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }
    public Course updateCourse(Course course, int id) {
        Course existingCourse = courseRepository.findById(id).orElse(null);
        existingCourse.setCourseId(course.getCourseId());
        existingCourse.setName(course.getName());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setCredits(course.getCredits());
        existingCourse.setProjects(course.getProjects());
        return courseRepository.save(existingCourse);
    }
    public void deleteCourseById(int id) {
        courseRepository.deleteById(id);        
    }
    
}
