import Modal from '@/components/modal';
import ModalLink from '@/components/modal-link';
import GenericTable from '@/components/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PaginatedCollection } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Board',
        href: '/boards',
    },
];

// Advanced usage with all features
export default function Index({
    boards,
    filters,
}: {
    boards: PaginatedCollection<Module.Kanban.DTOs.BoardData>;
    filters?: { search?: string; per_page?: string };
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Boards Table" />

            <GenericTable
                data={boards}
                buttons={
                    <>
                        <ModalLink href={route('module.kanban.board.create')}>Create Board</ModalLink>

                    </>
                }
                columns={[
                    {
                        accessorKey: 'title',
                        header: 'Full Name',
                        size: 200,
                        Cell: ({ row }) => <Link href={route('module.kanban.board.show', row.original.id ?? '')}> {row.original.title}</Link>,

                    },
                ]}
                actions={[
                    {
                        label: 'Edit',
                        icon: <IconEdit size={14} />,
                        href: (board: Module.Kanban.DTOs.BoardData) =>
                            `${route('module.kanban.board.edit', {
                                id: board.id,
                            })}`,
                    },
                    {
                        label: 'Delete',
                        icon: <IconTrash size={14} />,
                        color: 'red',
                        onClick: (board: Module.Kanban.DTOs.BoardData) => {
                            if (confirm('Delete user?')) {
                                router.delete(
                                    route('module.kanban.board.delete', {
                                        id: board.id,
                                    }),
                                );
                            }
                        },
                    },
                ]}
                title="Board"
                serverSide={true}
                enableGlobalFilter={true}
                enableRowSelection={true}
                initialPageSize={parseInt(filters?.per_page || '10')}
                onSearch={(term) => {
                    router.visit(window.location.pathname, {
                        data: { ...filters, search: term, page: 1 },
                        preserveState: true,
                        preserveScroll: true,
                        only: ['boards', 'filters'],
                    });
                }}
                onPageChange={(page) => {
                    router.visit(window.location.pathname, {
                        data: { ...filters, page },
                        preserveState: true,
                        preserveScroll: true,
                        only: ['boards', 'filters'],
                    });
                }}
                onPageSizeChange={(size) => {
                    router.visit(window.location.pathname, {
                        data: { ...filters, per_page: size, page: 1 },
                        preserveState: true,
                        preserveScroll: true,
                        only: ['boards', 'filters'],
                    });
                }}
            />
        </AppLayout>
    );
}
