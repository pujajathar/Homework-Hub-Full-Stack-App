package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
