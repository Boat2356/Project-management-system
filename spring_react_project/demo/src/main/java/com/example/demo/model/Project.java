package com.example.demo.model;
import java.util.HashSet;
import java.util.Set;
import java.util.Map;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;


@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    @Column(name = "isapproved", columnDefinition = "false")
    private boolean isapproved = false;
    private int year;
    private int semester;
    private String proposalfilename;
    private String fulldocumentfilename;
    private String imagefilename;
    
    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] proposalFile;
    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] fulldocumentFile;
    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] image;  

    //@JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<ProjectStudent> projectStudents = new HashSet<ProjectStudent>();

    //@JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supervisor_id", referencedColumnName = "id")
    private Supervisor supervisor;

    //@JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;

    /* 
    @Transient
    private List<Map<String, Object>> users;

    public List<Map<String, Object>> getUsers() {
        return users;
    }

    public void setUsers(List<Map<String, Object>> users) {
        this.users = users;
    }*/

    public String getProposalfilename() {
        return proposalfilename;
    }
    public void setProposalfilename(String proposalfilename) {
        this.proposalfilename = proposalfilename;
    }
    public String getFulldocumentfilename() {
        return fulldocumentfilename;
    }
    public void setFulldocumentfilename(String fulldocumentfilename) {
        this.fulldocumentfilename = fulldocumentfilename;
    }
    public String getImagefilename() {
        return imagefilename;
    }
    public void setImagefilename(String imagefilename) {
        this.imagefilename = imagefilename;
    }
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public boolean isapproved() {
        return isapproved;
    }
    public void setisapproved(boolean isapproved) {
        this.isapproved = isapproved;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getSemester() {
        return semester;
    }
    public void setSemester(int semester) {
        this.semester = semester;
    }
    public byte[] getProposalFile() {
        return proposalFile;
    }
    public void setProposalFile(byte[] proposalFile) {
        this.proposalFile = proposalFile;
    }
    public byte[] getFulldocumentFile() {
        return fulldocumentFile;
    }
    public void setFulldocumentFile(byte[] fulldocumentFile) {
        this.fulldocumentFile = fulldocumentFile;
    }
    public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }
    public Supervisor getSupervisor() {
        return supervisor;
    }
    public void setSupervisor(Supervisor supervisor) {
        this.supervisor = supervisor;
    }
    public Course getCourse() {
        return course;
    }
    public void setCourse(Course course) {
        this.course = course;
    }    
    public Set<ProjectStudent> getProjectStudents() {
        return projectStudents;
    }
    public void setProjectStudents(Set<ProjectStudent> projectStudents) {
        this.projectStudents = projectStudents;
    }

    
}
