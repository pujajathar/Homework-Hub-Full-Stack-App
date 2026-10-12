package com.example.homework_hub_backend.services;

import com.example.homework_hub_backend.dto.RegisterRequest;
import com.example.homework_hub_backend.models.User;
import com.example.homework_hub_backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
}
