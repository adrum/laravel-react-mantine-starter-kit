import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';

const data = [
    {
        title: 'About',
        links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: '#' },
            { label: 'Support', link: '#' },
            { label: 'Forums', link: '#' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: '#' },
            { label: 'Media assets', link: '#' },
            { label: 'Changelog', link: '#' },
            { label: 'Releases', link: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Join Discord', link: '#' },
            { label: 'Follow on Twitter', link: '#' },
            { label: 'Email newsletter', link: '#' },
            { label: 'GitHub discussions', link: '#' },
        ],
    },
];

export function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'> key={index} component="a" href={link.link} onClick={(event) => event.preventDefault()}>
                {link.label}
            </Text>
        ));

        return (
            <div key={group.title}>
                <Text>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className="bg-blue-100 py-8">
            <Container size={'xl'} className="flex w-full justify-between space-x-2 pb-4">
                <div>
                    ApplicationLogo
                    <Text size="xs" c="dimmed">
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </div>
                <div className="flex">{groups}</div>
            </Container>
            <Container size={'xl'} className="border-t py-4">
                <Text c="dimmed" size="sm">
                    © 2020 mantine.dev. All rights reserved.
                </Text>

                <Group gap={0} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
