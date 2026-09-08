package com.example.homework_hub_backend.controllers;

import com.example.homework_hub_backend.models.Notification;
import com.example.homework_hub_backend.repositories.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the React frontend
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @GetMapping("/unread")
    public long getUnreadNotifications() {
        return notificationRepository.countByIsReadFalse();
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationRepository.findById(id).orElse(null);
    }
    @GetMapping("/parent")
    public List<Notification> getNotificationsByParent() {
            return notificationRepository.findByRecipient("parent");
    }
    @GetMapping("/parent/unread")
    public long getUnreadNotificationsByParent() {
        return notificationRepository.countByRecipientAndIsReadFalse("parent");
    }

    @GetMapping("/student")
    public List<Notification> getNotificationsByStudent() {
        return notificationRepository.findByRecipient("student");
    }
    @GetMapping("/student/unread")
    public long getUnreadNotificationsByStudent() {
        return notificationRepository.countByRecipientAndIsReadFalse("student");
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationRepository.save(notification);
    }

    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Long id, @RequestBody Notification updatedNotification) {
        return notificationRepository.findById(id)
                .map(notification -> {
                    notification.setMessage(updatedNotification.getMessage());
                    notification.setRead(updatedNotification.getRead());
                    return notificationRepository.save(notification);
                })
                .orElseGet(null);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationRepository.deleteById(id);
    }
}
