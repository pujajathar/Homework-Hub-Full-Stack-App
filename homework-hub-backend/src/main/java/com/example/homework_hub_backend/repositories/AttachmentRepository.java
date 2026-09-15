package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
List<Attachment> findByAssignmentId(Long assignmentId); //finds attachments whose assignment id matches id we provide
}
