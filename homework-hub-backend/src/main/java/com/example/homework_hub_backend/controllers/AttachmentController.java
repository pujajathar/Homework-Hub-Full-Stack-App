package com.example.homework_hub_backend.controllers;

import com.example.homework_hub_backend.models.Assignment;
import com.example.homework_hub_backend.models.Attachment;
import com.example.homework_hub_backend.repositories.AssignmentRepository;
import com.example.homework_hub_backend.repositories.AttachmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/attachments")
@CrossOrigin(origins = "http://localhost:5173")
public class AttachmentController {

    private final AttachmentRepository attachmentRepository;

    private final AssignmentRepository assignmentRepository;

    private final String uploadDirectory = "uploads/";

    public AttachmentController(AttachmentRepository attachmentRepository, AssignmentRepository assignmentRepository) {
        this.attachmentRepository = attachmentRepository;
        this.assignmentRepository = assignmentRepository;
    }

    @PostMapping("/upload/{assignmentId}")
    public ResponseEntity<String> uploadFile(
            @PathVariable Long assignmentId,
            @RequestParam("file")MultipartFile file)
    {
        try {
            Assignment assignment = assignmentRepository.findById(assignmentId)
                    .orElseThrow(() -> new RuntimeException("Assignment not found"));
            Path uploadPath = Paths.get(uploadDirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            Files.write(filePath, file.getBytes());

            Attachment attachment =new Attachment();
            attachment.setFileName(fileName);
            attachment.setFileType(file.getContentType());
            attachment.setFilePath(filePath.toString());
            attachment.setAssignment(assignment);

            attachmentRepository.save(attachment);

            return ResponseEntity.ok("File uploaded successfully. ");

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("File upload failed.");
        }
    }

}
