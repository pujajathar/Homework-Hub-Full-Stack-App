package com.example.homework_hub_backend.controllers;

import com.example.homework_hub_backend.dto.LoginRequest;
import com.example.homework_hub_backend.dto.RegisterRequest;
import com.example.homework_hub_backend.models.User;
import com.example.homework_hub_backend.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //Request a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request);

            //Return only safe user information
            return ResponseEntity.status((HttpStatus.CREATED))
                    .body("User registered successfully with email: " + user.getEmail() + " and role: " + user.getRole());
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST))
                    .body("Error occurred while registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            return ResponseEntity.ok().body("Login successful. Token: " + token);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.UNAUTHORIZED))
                    .body("Error occurred while logging in: " + e.getMessage());
        }
    }
}
