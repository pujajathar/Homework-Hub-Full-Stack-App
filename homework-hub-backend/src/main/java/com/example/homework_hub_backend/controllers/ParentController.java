package com.example.homework_hub_backend.controllers;


import com.example.homework_hub_backend.models.Parent;
import com.example.homework_hub_backend.repositories.ParentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parents")
public class ParentController {

    private final ParentRepository parentRepository;

    public ParentController(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @GetMapping
    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Parent getParentById(@PathVariable int id) {
        return parentRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Parent createParent(@RequestBody Parent parent) {
        return parentRepository.save(parent);
    }

    @PutMapping("/{id}")
    public Parent updateParent(@PathVariable int id, @RequestBody Parent updatedParent) {
        return parentRepository.findById(id)
                .map(parent -> {
                    parent.setFirstName(updatedParent.getFirstName());
                    parent.setLastName(updatedParent.getLastName());
                    parent.setEmail(updatedParent.getEmail());
                    return parentRepository.save(parent);
                })
                .orElseGet(null);
    }

    @DeleteMapping("/{id}")
    public void deleteParent(@PathVariable int id) {
        parentRepository.deleteById(id);
    }
}