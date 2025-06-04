import { createRoot } from 'react-dom/client';
import { Modal, Button, Group, Text, MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import theme from '@/theme';
// Core confirm logic
export function confirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const ConfirmModal = () => {
      const [opened, setOpened] = useState(true);

      const handleClose = (result: boolean) => {
        setOpened(false);
        setTimeout(() => {
          root.unmount();
          container.remove();
          resolve(result);
        }, 200); // Let modal animation finish
      };

      return (
        <MantineProvider theme={theme}>
          <Modal opened={opened} onClose={() => handleClose(false)} title="Confirm" centered>
            <Text mb="md">{message}</Text>
            <Group justify="flex-end">
              <Button variant="default" onClick={() => handleClose(false)}>
                No
              </Button>
              <Button color="red" onClick={() => handleClose(true)}>
                Yes
              </Button>
            </Group>
          </Modal>
        </MantineProvider>
      );
    };

    const root = createRoot(container);
    root.render(<ConfirmModal />);
  });
}

