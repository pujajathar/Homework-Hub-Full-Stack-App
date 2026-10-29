package com.example.homework_hub_backend.config;

import com.example.homework_hub_backend.models.User;
import com.example.homework_hub_backend.repositories.UserRepository;
import com.example.homework_hub_backend.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Read the Authorization header.
        String authHeader = request.getHeader("Authorization");

        // Continue if no Bearer token is provided.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract the token and user's email.
        String token = authHeader.substring(7);

        try {
            String email = jwtService.ExtractEmail(token);

            // Authenticate only if the user is not already authenticated.
            if (email != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                if (userRepository.findByEmail(email).isPresent()
                && jwtService.isTokenValid(token, email)) {
                    User databaseUser = userRepository.findByEmail(email).get();
                    String authority = databaseUser.getRole().name();

                    UserDetails userDetails =
                            org.springframework.security.core.userdetails.User
                                    .withUsername(databaseUser.getEmail())
                                    .password(databaseUser.getPassword())
                                    .roles(authority)
                                    .build();

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }
            }
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException exception) {
            // Clear authentication when the token is invalid.
            SecurityContextHolder.clearContext();
        }

        // Continue processing the request.
        filterChain.doFilter(request, response);
    }
}