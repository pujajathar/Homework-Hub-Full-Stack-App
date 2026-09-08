import { useState, useEffect } from "react";
import './Notification.css';
function Notification({ onNotificationRead, recipient}) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const fetchNotifications = () => {
    fetch(`http://localhost:8080/notifications/${recipient}`)  //fetches notifications from backend
        .then((response) => {
                        console.log("Response status:", response.status);
                        return response.json();
        })
        .then((data) => {
                        console.log("Notifications from backend:", data);

            setNotifications(data);
        })
        .catch((error) => console.error('Error fetching notifications:', error));
    };

    fetchNotifications(); //get notifications immediately
    const interval = setInterval(fetchNotifications, 5000); //fetches notifications every 5 seconds
    return () => clearInterval(interval); //clears interval when component unmounts
}, [recipient]);

    const handleToggleRead = (notification) => { 
     //handles marking a notification as read or unread
     const newReadStatus = !notification.read; //toggles the read status
    const updatedNotifications = {
        message: notification.message,
        read: !notification.read,  //toggles the read status
        createdAt: notification.createdAt
    };
    fetch(`http://localhost:8080/notifications/${notification.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedNotifications)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to update notification');
        }
        return response.json();
    })
    .then((updatedNotification) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => 
                (notification.id === updatedNotification.id 
                    ? updatedNotification : notification))
        );

        if (newReadStatus) {
            onNotificationRead(-1); //notify parent component that a notification has been read
        } else {
            onNotificationRead(1); //notify parent component that a notification has been marked as unread
        }
    })
    .catch((error) => console.error('Error updating notification:', error));
};


     return (
        <div className="notification-container">
            <h2>Notifications 🔔</h2>      
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (   
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            onClick={() => handleToggleRead(notification)}>  {/*marks notification as read/unread when clicked */}
                            <div className="notification-icon">
                                {notification.read ? '✅' : '🔔'}
                            </div>
                            <div className="notification-content">
                                <p className="notification-message">{notification.message}</p>
                                <small className="notification-date">Created on: {notification.createdAt}</small>
                            </div>
                            {!notification.read && (
                                <span className="unread-label">New</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Notification;