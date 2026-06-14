import type { UrlMethodPair } from '@inertiajs/core';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import { Button, InputError } from '@mantine/core';
import { IconKeyFilled } from '@tabler/icons-react';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
    separator?: string;
    /**
     * Whether to render the "or" separator beneath the button.
     * Defaults to true; pass false when there's nothing below it
     * to separate (e.g. a passwordless account with no password
     * form on the confirmation screen).
     */
    showSeparator?: boolean;
};

export default function PasskeyVerify({
    routes,
    label,
    loadingLabel,
    separator,
    showSeparator = true,
}: Props = {}) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        ...(routes && {
            routes: {
                options: routes.options.url,
                submit: routes.submit.url,
            },
        }),
        onSuccess: (response) => {
            window.location.href = response.redirect ?? '/dashboard';
        },
    });

    if (!isSupported) {
        return null;
    }

    return (
        <>
            <div className="grid gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    loading={isLoading}
                    onClick={verify}
                    disabled={isLoading}
                >
                    <IconKeyFilled className="h-4 w-4" />
                    {isLoading
                        ? (loadingLabel ?? 'Authenticating...')
                        : (label ?? 'Sign in with a passkey')}
                </Button>
                {error && (
                    <InputError className="text-center">{error}</InputError>
                )}
            </div>

            {showSeparator && (
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <hr className="w-full border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            {separator ?? 'Or continue with email'}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
