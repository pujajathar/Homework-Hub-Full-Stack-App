package com.example.homework_hub_backend.controllers;

import com.example.homework_hub_backend.models.Assignment;
import com.example.homework_hub_backend.models.Attachment;
import com.example.homework_hub_backend.repositories.AssignmentRepository;
import com.example.homework_hub_backend.repositories.AttachmentRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

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

    @GetMapping("/download/{id}") // Attachment retrive/Download endpoint
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws MalformedURLException {

        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attachment not found."));

        Path filePath = Paths.get(attachment.getFilePath());
        UrlResource resource = new UrlResource(filePath.toUri());

        ContentDisposition contentDisposition = ContentDisposition
                .attachment()
                .filename(attachment.getFileName(), StandardCharsets.UTF_8)
                .build();
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        contentDisposition.toString()
                )
                .body(resource);
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<Resource> viewFile(@PathVariable Long id) throws MalformedURLException {
        //find the attachment in the database
        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attachment not found."));

        //Get the location of the stored file
        Path filePath = Paths.get(attachment.getFilePath());
        //Create resource from file path so spring can send the file.
        UrlResource resource = new UrlResource(filePath.toUri());

        ContentDisposition contentDisposition = ContentDisposition
                .inline()
                .filename(attachment.getFileName(), StandardCharsets.UTF_8)
                .build();

        //Open the file in the browser instead of downloading it
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        contentDisposition.toString()
                )
                .header(
                        HttpHeaders.CONTENT_TYPE,
                        attachment.getFileType()
                )
                .body(resource);
    }

    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<List<Attachment>> getAttachmentByAssignment (@PathVariable Long assignmentId) {
        //Finds all attachments belonging to the assignment.
        List<Attachment> attachments = attachmentRepository.findByAssignmentId(assignmentId);
        //Returns the attachments to front-end.
        return ResponseEntity.ok(attachments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttachment(@PathVariable Long id) {
        try {
                Attachment attachment = attachmentRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Attachment not found."));

                // Delete physical file
                Path filePath = Paths.get(attachment.getFilePath());

                if (Files.exists(filePath)) {
                    Files.delete(filePath);
                }

                // Delete attachment from database
                attachmentRepository.delete(attachment);
                return ResponseEntity.ok("Attachment deleted successfully.");

            } catch(IOException e){
                return ResponseEntity.internalServerError().body("Failed to delete attachment file.");
            }
    }

}
