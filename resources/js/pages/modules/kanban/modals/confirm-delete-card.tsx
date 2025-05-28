import { close } from '@/useModal';
import { router, useForm, usePage } from '@inertiajs/react';
import { Button, Flex, Group, Text } from '@mantine/core';
import { FormEventHandler } from 'react';

type ColumnForm = {
    card_id: string | number;
};

export default function ConfirmDeleteCard({ card_id }: { card_id: string | number }) {
    const {
        data,
        delete: deleteColumn,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm<Required<ColumnForm>>({
        card_id: card_id,
    });

    const { board } = usePage().props;


    const submit: FormEventHandler = (e) => {
        e.preventDefault();


        deleteColumn(
            route('module.kanban.card.delete', {
                card_id: card_id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route('module.kanban.board.show', board?.id), {
                        preserveScroll: true,
                    });

                    close();
                },
            },
        );
    };

    return (
        <form onSubmit={submit}>
            <Flex>
                <Text size="xs">Are you sure you want to delete this card?</Text>
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
