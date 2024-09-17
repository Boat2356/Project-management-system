package com.example.demo.model;

public class AuthenticationResponse {
    public String token;
    public AuthenticationResponse(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
}
