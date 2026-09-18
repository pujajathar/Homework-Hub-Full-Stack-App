package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    long countByIsReadFalse();  //counts all unread notifications.

    //Finds all notifications for a specific recipient
    List<Notification> findByRecipient(String recipient);

    //Counts unread notifications for a specific recipient
    long countByRecipientAndIsReadFalse(String recipient);

    //Finds all notifications connected to a specific assignment
    Iterable<? extends Notification> findByAssignmentId(Long id);
}
