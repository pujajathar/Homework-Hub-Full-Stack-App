import { useState, useEffect } from "react";
import './Notification.css';

function Notification({ onNotificationRead, recipient}) {

    //Stores the notifications received from backend
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        //Fetch notifications for the current recipient
        const fetchNotifications = () => {
    fetch(`http://localhost:8080/notifications/${recipient}`)  //fetches notifications from backend
        .then((response) => {
                        console.log("Response status:", response.status);
                        return response.json();
        })
        .then((data) => {
                        console.log("Notifications from backend:", data);

            setNotifications(data); //Stores notifications in state
        })
        .catch((error) => console.error('Error fetching notifications:', error));
    };

    fetchNotifications(); //get notifications immediately when component loads

    const interval = setInterval(fetchNotifications, 5000); //fetches/checks for notifications every 5 seconds

    return () => clearInterval(interval); //clears interval when component unmounts

    }, [recipient]);

     //marking a notification as read or unread
    const handleToggleRead = (notification) => { 
    
    const newReadStatus = !notification.read; //toggles the read status/reverse the current read status
    const updatedNotifications = {  //Creates updated notification data
        message: notification.message,
        read: !notification.read,  //toggles the read status
        createdAt: notification.createdAt
    };
    fetch(`http://localhost:8080/notifications/${notification.id}`, { //        // Send the updated read status to the backend
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
        // Updates the notification in the local state
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => 
                (notification.id === updatedNotification.id 
                    ? updatedNotification : notification))
        );

        //Updates unread notification count in the parent component
        if (newReadStatus) {
            onNotificationRead(-1); 
        } else {
            onNotificationRead(1);
        }
    })
    .catch((error) => console.error('Error updating notification:', error));
};

//Deletes Notification
const handleDeleteNotification = (notificationId) => {
    fetch(`http://localhost:8080/notifications/${notificationId}`, { //Sends delete request to backend
        method: 'DELETE'
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to delete notification');
        }
        setNotifications((prevNotifications) =>  //Removes deleted notification from local state
            prevNotifications.filter((notification) => notification.id !== notificationId)
        );
    })
    .catch((error) => console.error('Error deleting notification:', error));
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
                            <button className="delete-notification"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNotification(notification.id);
                            }}>
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Notification;