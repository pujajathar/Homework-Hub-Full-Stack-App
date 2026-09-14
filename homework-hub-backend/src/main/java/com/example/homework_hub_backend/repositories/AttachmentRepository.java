package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
