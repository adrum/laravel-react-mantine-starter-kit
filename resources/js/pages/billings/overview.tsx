import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import BillingsLayout from '@/layouts/billings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billings',
        href: '/billings/overview',
    },
];

export default function Overview() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <BillingsLayout>burat {auth.user.name}</BillingsLayout>
        </AppLayout>
    );
}
