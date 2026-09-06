package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentRepository extends JpaRepository<Parent, Integer> {
}
