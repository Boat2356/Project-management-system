package com.example.demo.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    @Enumerated(value = EnumType.STRING)
    private Role role = Role.USER;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<ProjectStudent> projectStudents = new HashSet<ProjectStudent>();
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {        
        return List.of(new SimpleGrantedAuthority(role.name()));
    }    
    @Override
    public boolean isEnabled() {        
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {        
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {        
        return true;
    }
    @Override
    public boolean isAccountNonExpired() {        
        return true;
    }
    public Set<ProjectStudent> getProjectStudents() {
        return projectStudents;
    }
    public void setProjectStudents(Set<ProjectStudent> projectStudents) {
        this.projectStudents = projectStudents;
    }     

}

