import { close } from '@/useModal';
import { router, useForm } from '@inertiajs/react';
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { FormEventHandler } from 'react';

type ColumnForm = {
    content: string;
    column_id: string|number;
    board_id: string|number;
}

export default function CreateCard({column_id, board_id} : {
    column_id: string|number
    board_id: string|number

}) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ColumnForm>>({
        content: '',
        column_id: column_id,
        board_id: board_id
    });

   const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('module.kanban.card.store'), {
            preserveScroll: true,
            onSuccess: () => {
                router.visit(route('module.kanban.board.show', board_id),{
                    preserveScroll: true
                });
                close();
            }
        });

    };


  return (
    <form onSubmit={submit}>
      <TextInput
        withAsterisk
        label="Title"
        autoFocus
        placeholder="title"
        value={data.content}
        onChange={(e) => setData('content', e.target.value)}
        error={errors.content}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
