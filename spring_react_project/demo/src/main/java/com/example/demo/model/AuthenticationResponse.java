package com.example.demo.model;

public class AuthenticationResponse {
    public String token;
    public String role;
    public int id;

    public AuthenticationResponse(String token, String role, int id) {
        this.token = token;
        this.role = role;
        this.id = id;
    }
    
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
