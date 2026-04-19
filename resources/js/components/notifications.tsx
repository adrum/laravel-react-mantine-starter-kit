import { router } from '@inertiajs/react';
import {
    Notifications as MantineNotifications,
    notifications,
} from '@mantine/notifications';
import {
    IconAlertTriangle,
    IconCircleCheck,
    IconCircleX,
    IconInfoCircle,
} from '@tabler/icons-react';
import type { ComponentType } from 'react';
import type { AppColor } from '@/colors';
import type { FlashToast } from '@/types';

type TablerIcon = ComponentType<{ size?: number | string; color?: string }>;

router.on('flash', (event) => {
    const flash = (event as CustomEvent).detail?.flash;
    const data = flash?.toast as FlashToast | undefined;

    if (!data || !data.message) {
        return;
    }

    let title = 'Success';
    let Icon: TablerIcon = IconCircleCheck;
    let color: AppColor = 'green';

    switch (data.type) {
        case 'info':
            title = 'Info';
            Icon = IconInfoCircle;
            color = 'white';
            break;
        case 'error':
            title = 'Error';
            Icon = IconCircleX;
            color = 'red';
            break;
        case 'warning':
            title = 'Warning';
            Icon = IconAlertTriangle;
            color = 'orange';
            break;
    }

    notifications.show({
        title,
        icon: <Icon size={20} color="white" />,
        message: <p>{data.message ?? ''}</p>,
        color,
        autoClose: true,
        withCloseButton: true,
    });
});

export function Notifications() {
    return <MantineNotifications position="bottom-right" />;
}
