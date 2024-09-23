package com.example.demo.service;
import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.AuthenticationResponse;
import com.example.demo.model.Role;
import com.example.demo.model.Token;
import com.example.demo.model.User;
import com.example.demo.repository.TokenRepository;
import com.example.demo.repository.UserRepository;

@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager; 
    private final TokenRepository tokenRepository;   

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, TokenRepository tokenRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }
    public AuthenticationResponse register(User request){
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setStudent_id(request.getStudent_id());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);        
        user = repository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token, user.getRole().name(), user.getId());
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()));

        User user = repository.findByEmail(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtService.generateToken(user);
        

        // revoke all token by user
        revokeAllTokenByUser(user);

        // save the generated token
        saveUserToken(user, token);
        return new AuthenticationResponse(token, user.getRole().name(), user.getId());
    }

    public void revokeAllTokenByUser(User user) {
        List<Token> validTokenListByUser = tokenRepository.findAllTokenByUser(user.getId());
        if (!validTokenListByUser.isEmpty()) {
            validTokenListByUser.forEach(token -> {
                token.setLoggedOut(true);                
            });
        }
        tokenRepository.saveAll(validTokenListByUser);
    }

    private void saveUserToken(User user, String jwt) {
        // save the token
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    // Retrieve all users
    public Iterable<User> getAllUsers() {
        return repository.findAll();
    }

     // Retrieve user by ID
     public User getUserById(int id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
    // Update user
    public User updateUser(int id, User updatedUser) {
        User existingUser = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        //existingUser.setUsername(updatedUser.getUsername());
        existingUser.setStudent_id(updatedUser.getStudent_id());
        // existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        //existingUser.setRole(updatedUser.getRole());
        existingUser.setProjectStudents(updatedUser.getProjectStudents());
        return repository.save(existingUser);
    }
    // Delete user by ID
    public void deleteUser(int id) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        repository.delete(user);
    }

    public void revokeToken(String token) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
