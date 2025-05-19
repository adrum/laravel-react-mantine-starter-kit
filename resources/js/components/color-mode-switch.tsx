
import { ActionIcon, Menu, useMantineColorScheme } from '@mantine/core';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useAppearance } from '@/hooks/use-appearance';

export function ColorModeSwitch() {
  const { appearance, updateAppearance } = useAppearance();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="subtle" size="md" aria-label="Toggle color scheme">
          {colorScheme === 'dark' ? <IconMoon size={18} /> : <IconSun size={18} />}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Appearance</Menu.Label>
        <Menu.Item
          leftSection={<IconSun size={16} />}
          onClick={() => updateAppearance('light')}
          fw={appearance === 'light' ? 'bold' : 'normal'}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={16} />}
          onClick={() => updateAppearance('dark')}
          fw={appearance === 'dark' ? 'bold' : 'normal'}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          leftSection={<IconDeviceDesktop size={16} />}
          onClick={() => updateAppearance('system')}
          fw={appearance === 'system' ? 'bold' : 'normal'}
        >
          System
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
