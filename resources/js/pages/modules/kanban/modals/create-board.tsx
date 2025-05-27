import { close } from '@/useModal';
import { useForm } from '@inertiajs/react';
import { Button, Group, TextInput } from '@mantine/core';
import { FormEventHandler } from 'react';

type ColumnForm = {
    title: string;
};

export default function CreateBoard({ board }: { board?: Module.Kanban.DTOs.BoardData }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ColumnForm>>({
        title: board?.title ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (board) {
            post(route('module.kanban.board.update', {
                id: board.id,
            }), {
                preserveScroll: true,
                onSuccess: () => {
                    close();
                },
            });
        } else {
            post(route('module.kanban.board.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    close();
                },
            });
        }
    };

    return (
        <form onSubmit={submit}>
            <TextInput
                withAsterisk
                label="Title"
                placeholder="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                error={errors.title}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    );
}
