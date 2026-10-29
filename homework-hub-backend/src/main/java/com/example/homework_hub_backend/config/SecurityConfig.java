package com.example.homework_hub_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in this example
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.PUT, "/assignments/**"
                        ).hasRole("TEACHER")

                        .requestMatchers(
                                HttpMethod.DELETE, "/assignments/**"
                        ).hasRole("TEACHER")

                        // All authenticated roles can view assignments.
                        .requestMatchers(
                                HttpMethod.GET, "/assignments",
                                "/assignments/**"
                        ).hasAnyRole("PARENT", "STUDENT", "TEACHER")

                        // Only teachers can create assignments
                                .requestMatchers(HttpMethod.POST, "/assignments")
                                .hasRole("TEACHER")

                        // Only teachers can update assignments
                                .requestMatchers(HttpMethod.PUT, "/assignments/**")
                                .hasRole("TEACHER")

                        // Only teachers can delete assignments
                                .requestMatchers(HttpMethod.DELETE, "/assignments/**")
                                .hasRole("TEACHER")

                        // All authenticated roles can view assignments
                                .requestMatchers(HttpMethod.GET, "/assignments", "/assignments/**")
                                .hasAnyRole("PARENT", "STUDENT", "TEACHER")

                        // Only teachers can upload attachments
                                .requestMatchers(HttpMethod.POST, "/attachments/upload/**")
                                .hasRole("TEACHER")

                        // Only teachers can delete attachments
                                .requestMatchers(HttpMethod.DELETE, "/attachments/**")
                                .hasRole("TEACHER")

                        // Parents, students, and teachers can view and download attachments
                                .requestMatchers(HttpMethod.GET, "/attachments/**")
                                .hasAnyRole("PARENT", "STUDENT", "TEACHER")

                        // Only teachers can create notifications
                                .requestMatchers(HttpMethod.POST, "/notifications")
                                .hasRole("TEACHER")

                        // Only teachers can delete notifications
                                .requestMatchers(HttpMethod.DELETE, "/notifications/**")
                                .hasRole("TEACHER")

                        // Only teachers can update notification details
                                .requestMatchers(HttpMethod.PUT, "/notifications/{id}")
                                .hasRole("TEACHER")

                        // Allow authenticated roles to mark notifications as read
                                .requestMatchers(HttpMethod.PUT, "/notifications/*/read")
                                .hasAnyRole("PARENT", "STUDENT", "TEACHER")

                        // Parents can view parent notifications only
                                .requestMatchers(HttpMethod.GET,
                                        "/notifications/parent",
                                        "/notifications/parent/unread")
                                .hasRole("PARENT")

                        // Students can view student notifications only
                                .requestMatchers(HttpMethod.GET,
                                        "/notifications/student",
                                        "/notifications/student/unread")
                                .hasRole("STUDENT")

                        // Only teachers can access general notification endpoints
                                .requestMatchers(HttpMethod.GET, "/notifications", "/notifications/**")
                                .hasRole("TEACHER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
