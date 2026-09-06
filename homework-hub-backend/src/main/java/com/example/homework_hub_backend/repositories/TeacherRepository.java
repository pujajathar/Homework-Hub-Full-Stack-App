package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}
