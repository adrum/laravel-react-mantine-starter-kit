import Board from '@/components/kanban/board';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Board',
        href: '/boards',
    },
    {
        title: 'Columns',
        href: '/boards',
    },

];

export default function Index({ initialData, initialColumnNames, board }: { initialData: any; initialColumnNames: any, board: Module.Kanban.DTOs.BoardData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Boards" />
            <Board board={board} initialData={initialData} initialColumnNames={initialColumnNames} />
        </AppLayout>
    );
}
