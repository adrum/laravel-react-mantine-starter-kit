import { close } from '@/useModal';
import { router, useForm } from '@inertiajs/react';
import { Button, Flex, Group, Text } from '@mantine/core';
import { FormEventHandler } from 'react';

type ColumnForm = {
    content: string;
    column_id: string | number;
    board_id: string | number;
};

export default function ConfirmDeleteColumn({ column_id, board_id }: { column_id: string | number; board_id: string | number }) {
    const {
        data,
        delete: deleteColumn,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm<Required<ColumnForm>>({
        content: '',
        column_id: column_id,
        board_id: board_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        deleteColumn(
            route('module.kanban.column.delete', {
                column_id: column_id,
                board_id: board_id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route('module.kanban.board.show', board_id),{
                        preserveScroll: true
                    });

                    close();
                },
            },
        );
    };

    return (
        <form onSubmit={submit}>
            <Flex>
                <Text size="xs">Are you sure you want to delete this column? Deleting this column will also delete all of its cards.</Text>
            </Flex>

            <Group justify="center" mt="xl">
                <Button variant="subtle" type="submit">
                    Confirm Delete
                </Button>
                <Button onClick={() => close()}>Cancel</Button>
            </Group>
        </form>
    );
}
