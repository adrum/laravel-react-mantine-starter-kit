import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@mantine/core';
import { SocialiteIcons } from '@/components/socialite-icons';
import { SocialiteUi } from '@/types/socialite-ui';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Linked Accounts',
        href: '/settings/linked-accounts',
    },
];

interface LinkedAccountsProps {
    status?: string;
    auth: { user: any };
    socialiteUi: SocialiteUi;
}

export default function LinkedAccounts({ status, auth, socialiteUi }: LinkedAccountsProps) {
    const availableAccounts = socialiteUi.providers.filter(
        (provider: any) => !auth.user.social_accounts.some((socialAccount: any) => socialAccount.provider.id === provider.id),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Linked Accounts" description="View and remove your currently linked accounts" />

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {availableAccounts.map((provider: any) => (
                            <div key={provider.id} className="flex flex-col space-y-6 rounded-xl border p-4 md:space-y-4">
                                <div className="flex w-full justify-center py-2">
                                    <SocialiteIcons provider={provider.id} className="mx-auto h-8 w-8 md:mx-0" />
                                </div>

                                <div className="flex w-full justify-end">
                                    {!socialiteUi.hasPassword ? (
                                        <>
                                            <Button variant="secondary" className="w-full" disabled={true}>
                                                Link {provider.name}
                                            </Button>
                                            <p>Set a password to link new accounts</p>
                                        </>
                                    ) : (
                                        <Button variant="secondary" className="!w-full">
                                            <a href={route('oauth.redirect', { provider: provider.id })}>Link {provider.name}</a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
