package com.example.homework_hub_backend.repositories;

import com.example.homework_hub_backend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    long countByIsReadFalse();
    List<Notification> findByRecipient(String recipient);
    long countByRecipientAndIsReadFalse(String recipient);
}
