import { Modal, Button, Group, Text } from '@mantine/core';

interface ConfirmModalProps {
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export default function ConfirmModal({
  opened,
  onConfirm,
  onCancel,
  message = 'Are you sure?',
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onCancel} title="Confirm Action" centered>
      <Text mb="md">{message}</Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onCancel}>
          No
        </Button>
        <Button color="red" onClick={onConfirm}>
          Yes, Delete
        </Button>
      </Group>
    </Modal>
  );
}

