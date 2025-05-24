import { usePage } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export function useNotifications() {
    const { props } = usePage();

    useEffect(() => {
        // Check if there's a notification in the props
        if (props.notification && props.notification.body) {
            const { type, body } = props.notification;

            notifications.show({
                position: 'top-right',
                title: getNotificationTitle(type),
                message: body,
                color: getNotificationColor(type),
                autoClose: 5000,
            });
        }
    }, [props.notification]);
}

function getNotificationTitle(type) {
    switch (type) {
        case 'success':
            return 'Success';
        case 'error':
            return 'Error';
        case 'warning':
            return 'Warning';
        default:
            return 'Notification';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        case 'warning':
            return 'yellow';
        default:
            return 'blue';
    }
}
