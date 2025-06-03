import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';

import { Transition } from '@headlessui/react';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import TeamLayout from '@team/layouts/layout';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Team',
        href: '/teams/index',
    },
];

type TeamForm = {
    name: string;
};

export default function TeamIndex({
    current_team
}: {
    current_team : Modules.Team.DTOs.TeamData
    }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<TeamForm>>({
        name: current_team.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('module.team.update', current_team.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />
            <TeamLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Team information" description="Update your team" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                label="Team name"
                                value={data.name}
                                error={errors.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Enter your team name"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </TeamLayout>
        </AppLayout>
    );
}
