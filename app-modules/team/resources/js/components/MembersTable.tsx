import { usePermission } from '@/hooks/use-permission';
import { confirm } from '@/tools/confirm';
import { router, usePage } from '@inertiajs/react';
import { ActionIcon, Anchor, Avatar, Badge, Group, Table, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect } from 'react';

const jobColors: Record<string, string> = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
};

export function MembersTable({ team_id, data }: { team_id: number; data: Modules.Team.DTOs.TeamMemberData[] }) {
    const { can } = usePermission();
    const deleteMember = async (user_id: number) => {
        router.delete(route('module.team-member.delete', [team_id, user_id]), {
            preserveScroll: true,
        });
    };

    const rows =
        data?.map((item) => (
            <Table.Tr key={item.name}>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={30} src={item.avatar_url} radius={30} />
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Badge>{item.role}</Badge>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Anchor component="button" size="sm">
                        {item.email}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray">
                            <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>

                        {can('removeTeamMember', {
                            team: team_id,
                            user: item.id,
                        }) ? (
                            <ActionIcon
                                onClick={async () => (await confirm('Delete this item?')) && deleteMember(item.id)}
                                variant="subtle"
                                color="red"
                            >
                                <IconTrash size={16} stroke={1.5} />
                            </ActionIcon>
                        ) : null}
                    </Group>
                </Table.Td>
            </Table.Tr>
        )) ?? [];

    return rows.length === 0 ? (
        <Text color="dimmed" align="center" size="sm">
            Nothing found
        </Text>
    ) : (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <div>

                        </div>
                        <Table.Th>Member</Table.Th>
                        <Table.Th>Position</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows ?? []}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
