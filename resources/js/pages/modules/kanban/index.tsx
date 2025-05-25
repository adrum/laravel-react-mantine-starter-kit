import Board from '@/components/kanban/board';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kanban',
        href: '/boards',
    },
];

export default function Index({ initialData, initialColumnNames }: { initialData: any; initialColumnNames: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Boards" />
            <Board initialData={initialData} initialColumnNames={initialColumnNames} />
        </AppLayout>
    );
}
