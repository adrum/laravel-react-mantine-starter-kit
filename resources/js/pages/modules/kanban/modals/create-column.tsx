import { close } from '@/useModal';
import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { FormEventHandler } from 'react';

type ColumnForm = {
    name: string;
}

export default function CreateColumn() {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ColumnForm>>({
        name: '',
    });

   const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('module.kanban.column.store'), {
            preserveScroll: true,
        });

        close();
    };


  return (
    <form onSubmit={submit}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        value={data.name}
        onChange={(e) => setData('name', e.target.value)}
        error={errors.name}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
