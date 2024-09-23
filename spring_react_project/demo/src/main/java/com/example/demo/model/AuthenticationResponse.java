package com.example.demo.model;

public class AuthenticationResponse {
    public String token;
    public String role;

    public AuthenticationResponse(String token, String role) {
        this.token = token;
        this.role = role;
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

}
