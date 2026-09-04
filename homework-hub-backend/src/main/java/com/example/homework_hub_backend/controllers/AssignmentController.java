package com.example.homework_hub_backend.controllers;

import com.example.homework_hub_backend.models.Assignment;
import com.example.homework_hub_backend.repositories.AssignmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;

    public AssignmentController(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
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
        return assignmentRepository.save(assignment);
    }

    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody Assignment updatedAssignment) {
        return assignmentRepository.findById(id)
                .map(assignment -> {
                    assignment.setTitle(updatedAssignment.getTitle());
                    assignment.setDescription(updatedAssignment.getDescription());
                    assignment.setDueDate(updatedAssignment.getDueDate());
                    assignment.setCategory(updatedAssignment.getCategory()); // Update category
                    return assignmentRepository.save(assignment);
                })
                .orElseGet(null);
    }
    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        assignmentRepository.deleteById(id);
    }
}
