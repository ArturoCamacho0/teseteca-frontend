import React, { useState, useEffect } from 'react';
import { InlineNotification } from '@carbon/react';
import './index.css';

const Notification = ({ message, type }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        if (message !== '') {
            setShowNotification(true);
            setNotificationMessage(message);
        }
    }, [message]);

    const handleNotificationClose = () => {
        setShowNotification(false);
        setNotificationMessage('');
    };

    if (showNotification) {
        return (
            <div className="fixed-notification">
                <InlineNotification
                    title={type === 'error' ? 'Error' : type === 'success' ? 'Éxito' : ''}
                    subtitle={notificationMessage}
                    kind={type}
                    onClose={handleNotificationClose}
                />
            </div>
        );
    }

    return null;
};

export default Notification;
