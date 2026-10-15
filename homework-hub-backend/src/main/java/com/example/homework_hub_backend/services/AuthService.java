package com.example.homework_hub_backend.services;

import com.example.homework_hub_backend.dto.LoginRequest;
import com.example.homework_hub_backend.dto.RegisterRequest;
import com.example.homework_hub_backend.models.User;
import com.example.homework_hub_backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {
        // Check if the email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered");
        }

        // Create a new user and encode the password
        User user = new User();
        user.setEmail(request.getEmail());


        // Hash the password before saving it.
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Assign the permitted role.
        user.setRole(request.getRole());

        // Save the user to the database
        return userRepository.save(user);
    }

    public  String login(LoginRequest request) {
        // Find the user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        // Check if the password matches
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Generate a JWT token for the authenticated user
        return jwtService.GenerateToken(user.getEmail());
    }
}
