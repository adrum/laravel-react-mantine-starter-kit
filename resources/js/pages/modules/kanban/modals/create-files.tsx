import FileUpload from '@/components/file-upload';
import { close } from '@/useModal';
import { router, useForm } from '@inertiajs/react';
import '@mantine/dropzone/styles.css';
import { FormEventHandler } from 'react';

type ColumnForm = {
    content: string;
    column_id: string | number;
    board_id: string | number;
};

export default function CreateFiles({
    column_id,
    board_id
}: {
    column_id: string | number;
    board_id: string | number;
}) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ColumnForm>>({
        content: '',
        column_id: column_id,
        board_id: board_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('module.kanban.card.store-files'), {
            preserveScroll: true,
            onSuccess: () => {
                router.visit(route('module.kanban.board.show', board_id), {
                    preserveScroll: true,
                });
                close();
            },
        });
    };

    return (
        <div className="min-h-[700px]">
            <FileUpload
                uploadConfig={{
                    endpoint: route('module.kanban.card.store'),
                    method: 'post',
                    additionalData: {
                        content: data.content,
                        column_id: column_id,
                        board_id: board_id
                    },
                    onSuccess: () => {
                        router.visit(route('module.kanban.board.show', board_id), {
                            preserveScroll: true,
                        });
                        close();
                    },
                    onError: (error) => {
                        console.error('Upload failed:', error);
                    }
                }}
                hookOptions={{
                    maxFiles: 10,
                    maxFileSize: 5 * 1024 * 1024, // 5MB
                    acceptedTypes: ['image/*', 'video/*', 'audio/*']
                }}
                showStats={true}
                enablePasteUpload={true}
            />
        </div>
    );
}
