import { cn } from '@/lib/utils';
import { type SocialiteUi as SocialiteUiType } from '@/types/socialite-ui';
import { Text } from '@mantine/core';
import * as React from 'react';
import { SocialiteIcons } from './socialite-icons';

interface SocialiteUiProps extends React.ComponentProps<'div'> {
    socialiteUi: SocialiteUiType;
}

export default function Socialite({ socialiteUi, ...props }: SocialiteUiProps) {
    return (
        <div className={cn('grid space-y-6', props.className)} {...props}>
            <div className="inline-flex w-full items-center">
                <span className="text-muted-foreground mx-3 text-center text-sm">OR</span>
            </div>

            <Text>{socialiteUi.error}</Text>

            <div className="grid grid-cols-4 gap-3">
                {socialiteUi.providers.map((provider) => (
                    <a
                        key={provider.id}
                        className="inline-flex items-center justify-center rounded-md border px-4 py-2 transition duration-300 ease-out hover:border-black"
                        href={route('oauth.redirect', { provider: provider.id })}
                    >
                        <SocialiteIcons provider={provider.id} className="h-6 w-6" />
                    </a>
                ))}
            </div>
        </div>
    );
}
