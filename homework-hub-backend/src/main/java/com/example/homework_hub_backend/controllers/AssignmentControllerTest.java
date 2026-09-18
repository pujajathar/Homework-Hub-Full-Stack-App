package com.example.homework_hub_backend.controllers;
import com.example.homework_hub_backend.models.Assignment;
import com.example.homework_hub_backend.repositories.AssignmentRepository;
import com.example.homework_hub_backend.repositories.NotificationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

//Loads and starts spring application using randomly assigned port for testing
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
public class AssignmentControllerTest {

    @Autowired
    private AssignmentController assignmentController;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private NotificationRepository notificationRepository;


    @Test
    void getAllAssignments_returnAssignments() {
        //Creates test assignment
        Assignment assignment = new Assignment();
        assignment.setTitle("Practice addition, subtraction, place value, number comparisons, and word problems. Show your work for each problem.");
        assignment.setDescription("Complete the science worksheet.");
        assignmentRepository.save(assignment);

        List<Assignment> assignments =
                assignmentController.getAllAssignments();
        assertEquals(1, assignments.size()); //Verify one assignment was returned
        assertEquals("Practice addition, subtraction, place value, number comparisons, and word problems. Show your work for each problem.", assignments.get(0).getTitle() );

    }

}
