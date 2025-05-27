import { close } from '@/useModal';
import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FormEventHandler } from 'react';

type ColumnForm = {
    title: string;
}

export default function CreateColumn() {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ColumnForm>>({
        title: '',
    });

   const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('module.kanban.column.store'), {
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Column created successfully',
                    color: 'green',
                    autoClose: 5000,
                })

                close();
            }
        });

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
