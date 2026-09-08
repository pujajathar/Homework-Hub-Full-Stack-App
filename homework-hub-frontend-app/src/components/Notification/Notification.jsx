import { useState, useEffect } from "react";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
    fetch('http://localhost:8080/notifications')  //fetches notifications from backend
        .then((response) => {
                        console.log("Response status:", response.status);
                        return response.json();
        })
        .then((data) => {
                        console.log("Notifications from backend:", data);

            setNotifications(data);
        })
        .catch((error) => console.error('Error fetching notifications:', error));
    }, []);

    return (
        <div className="notification-container">
            <h2>Notifications 🔔</h2>      

            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (   
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="notification-item">
                            {notification.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Notification;