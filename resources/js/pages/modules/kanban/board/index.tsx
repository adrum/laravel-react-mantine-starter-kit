import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PaginatedCollection } from '@/types/global';
import DataTable from './boards.table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kanban',
        href: '/boards',
    },
];

export default function Index({ boards }: { boards: PaginatedCollection<Module.Kanban.DTOs.BoardData> }) {
    console.log(boards)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Boards" />
            <DataTable />
        </AppLayout>
    );
}
