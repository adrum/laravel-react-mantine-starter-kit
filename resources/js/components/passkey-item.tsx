import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconKeyFilled, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import type { Passkey } from '@/types/auth';

type Props = {
    passkey: Passkey;
    onDelete: (id: number, onError: () => void) => void;
};

export default function PasskeyItem({ passkey, onDelete }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(passkey.id, () => setIsDeleting(false));
    };

    return (
        <div className="flex items-center justify-between border-b p-4 last:border-b-0">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <IconKeyFilled className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                        <p className="font-medium tracking-tight">
                            {passkey.name}
                        </p>
                        {passkey.authenticator && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase ring-1 ring-border ring-inset">
                                {passkey.authenticator}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Added {passkey.created_at_diff}
                        {passkey.last_used_at_diff && (
                            <>
                                <span className="mx-1 text-muted-foreground/50">
                                    /
                                </span>
                                Last used {passkey.last_used_at_diff}
                            </>
                        )}
                    </p>
                </div>
            </div>

            <Button
                variant="subtle"
                size="sm"
                onClick={open}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
                <IconTrash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
            </Button>

            <Modal
                opened={opened}
                onClose={close}
                centered
                title="Remove passkey"
                classNames={{
                    body: 'bg-background!',
                    header: 'bg-background!',
                    content: 'border',
                    overlay: 'bg-black/80',
                }}
                radius="md"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to remove the "{passkey.name}"
                        passkey? You will no longer be able to use it to sign
                        in.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button variant="default" onClick={close}>
                            Cancel
                        </Button>
                        <Button
                            color="red"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Removing...' : 'Remove passkey'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
