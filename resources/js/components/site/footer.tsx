import { Link } from '@inertiajs/react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import AppLogo from '../app-logo';

const data = [
    {
        title: 'About',
        links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: route('plans.index') },
            { label: 'Support', link: '#' },
            { label: 'FAQ', link: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Documentation', link: '#' },
            { label: 'API Reference', link: '#' },
            { label: 'Changelog', link: '#' },
            { label: 'Blog', link: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Discord', link: '#' },
            { label: 'Twitter', link: '#' },
            { label: 'Newsletter', link: '#' },
            { label: 'GitHub', link: '#' },
        ],
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                component={Link}
                href={link.link}
                className="block py-1 text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
                {link.label}
            </Text>
        ));

        return (
            <div key={group.title} className="mb-6 md:mb-0">
                <Text className="mb-3 font-semibold text-gray-900 dark:text-white">{group.title}</Text>
                <div className="flex flex-col space-y-2">{links}</div>
            </div>
        );
    });

    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <Container className="py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1">
                        <div className="mb-4 flex items-center">
                            <AppLogo />
                        </div>
                        <Text className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Build fully functional accessible web applications faster than ever
                        </Text>
                        <Group gap="xs" className="mt-4">
                            <ActionIcon size="lg" variant="subtle" radius="xl" component="a" href="#" aria-label="Twitter">
                                <IconBrandTwitter size={18} className="text-gray-500 transition-colors hover:text-indigo-600" />
                            </ActionIcon>
                            <ActionIcon size="lg" variant="subtle" radius="xl" component="a" href="#" aria-label="YouTube">
                                <IconBrandYoutube size={18} className="text-gray-500 transition-colors hover:text-indigo-600" />
                            </ActionIcon>
                            <ActionIcon size="lg" variant="subtle" radius="xl" component="a" href="#" aria-label="Instagram">
                                <IconBrandInstagram size={18} className="text-gray-500 transition-colors hover:text-indigo-600" />
                            </ActionIcon>
                        </Group>
                    </div>
                    <div className="col-span-3 grid grid-cols-1 gap-8 sm:grid-cols-3">{groups}</div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 sm:flex-row dark:border-gray-800">
                    <Text className="text-sm text-gray-500 dark:text-gray-400">© {currentYear} SassyKit All rights reserved.</Text>
                    <div className="mt-4 flex space-x-6 sm:mt-0">
                        <Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
