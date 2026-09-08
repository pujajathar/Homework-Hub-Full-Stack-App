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
       String message = "New assignment created: " + savedAssignment.getTitle() + " (Due: " + savedAssignment.getDueDate() + ")";
       //notification for parents
        Notification parentNotification = new Notification();
        parentNotification.setMessage(message);
        parentNotification.setRead(false);
        parentNotification.setCreatedAt(LocalDate.now());
        parentNotification.setRecipient("parent"); // Set recipient to parent
        notificationRepository.save(parentNotification);

        //notification for students
        Notification studentNotification = new Notification();
        studentNotification.setMessage(message);
        studentNotification.setRead(false);
        studentNotification.setCreatedAt(LocalDate.now());
        studentNotification.setRecipient("student"); // Set recipient to student
        notificationRepository.save(studentNotification);
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
