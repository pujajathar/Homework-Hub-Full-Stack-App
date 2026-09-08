package com.example.homework_hub_backend.controllers;

import com.example.homework_hub_backend.models.Assignment;
import com.example.homework_hub_backend.models.Notification;
import com.example.homework_hub_backend.repositories.AssignmentRepository;
import com.example.homework_hub_backend.repositories.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/assignments")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the React frontend
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final NotificationRepository notificationRepository;

    public AssignmentController(AssignmentRepository assignmentRepository, NotificationRepository notificationRepository) {
        this.assignmentRepository = assignmentRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        Assignment savedAssignment = assignmentRepository.save(assignment);
        // Create a notification for the new assignment
        Notification notification = new Notification();
        notification.setMessage("New assignment: " + savedAssignment.getTitle()
        + "\nDue: " + savedAssignment.getDueDate().format(java.time.format.DateTimeFormatter.ofPattern("MMM dd, yyyy")));
        notification.setRead(false);
        notification.setCreatedAt(LocalDate.now());
        notificationRepository.save(notification); // Save the notification
        return savedAssignment;
    }

    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody Assignment updatedAssignment) {
        return assignmentRepository.findById(id)
                .map(assignment -> {
                    assignment.setTitle(updatedAssignment.getTitle());
                    assignment.setDescription(updatedAssignment.getDescription());
                    assignment.setDueDate(updatedAssignment.getDueDate());
                    assignment.setCategory(updatedAssignment.getCategory());
                    assignment.setStatus(updatedAssignment.getStatus());
                    // Update category and status
                    return assignmentRepository.save(assignment);
                })
                .orElseGet(null);
    }
    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        assignmentRepository.deleteById(id);
    }
}
