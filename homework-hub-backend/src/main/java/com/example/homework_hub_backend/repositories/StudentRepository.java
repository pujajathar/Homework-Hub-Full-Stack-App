package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
