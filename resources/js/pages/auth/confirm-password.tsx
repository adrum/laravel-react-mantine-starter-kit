import { Form, Head, setLayoutProps, usePage } from '@inertiajs/react';
import { Button, PasswordInput } from '@mantine/core';
/* @chisel-passkeys */
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import PasskeyVerify from '@/components/passkey-verify';
/* @end-chisel-passkeys */
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword(
    /* @chisel-passkeys */
    { hasPasskeys = false }: { hasPasskeys?: boolean },
    /* @end-chisel-passkeys */
) {
    // Passwordless (passkey-only) accounts report has_password=false;
    // undefined (passkeys build stripped, or prop absent) is treated as
    // "has a password" so the form always renders in that build.
    const hasPassword = usePage().props.auth.user.has_password !== false;

    // Baseline wording — used as-is when passkeys are disabled, and
    // overridden below when a passkey option is available.
    setLayoutProps({
        title: 'Confirm your password',
        description:
            'This is a secure area of the application. Please confirm your password before continuing.',
    });

    /* @chisel-passkeys */
    setLayoutProps({
        title:
            hasPassword && hasPasskeys
                ? 'Confirm your identity'
                : hasPasskeys
                  ? 'Confirm with passkey'
                  : 'Confirm your password',
        description:
            hasPassword && hasPasskeys
                ? 'This is a secure area of the application. Confirm with your passkey or password to continue.'
                : hasPasskeys
                  ? 'This is a secure area of the application. Approve the passkey prompt to continue.'
                  : 'This is a secure area of the application. Please confirm your password before continuing.',
    });
    /* @end-chisel-passkeys */

    return (
        <>
            <Head title="Confirm password" />

            <div className="space-y-6">
                {/* @chisel-passkeys */}
                {hasPasskeys && (
                    <PasskeyVerify
                        routes={{
                            options: confirmOptions(),
                            submit: confirmStore(),
                        }}
                        label="Confirm with passkey"
                        loadingLabel="Confirming..."
                        separator="Or confirm with password"
                        showSeparator={hasPassword}
                    />
                )}
                {/* @end-chisel-passkeys */}

                {hasPassword && (
                    <Form {...store.form()} resetOnSuccess={['password']}>
                        {({ processing, errors }) => (
                            <div className="space-y-6">
                                <div className="grid gap-2">
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        label="Password"
                                        error={errors.password}
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        autoFocus
                                    />
                                </div>

                                <div className="flex items-center">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        loading={processing}
                                        disabled={processing}
                                        data-test="confirm-password-button"
                                    >
                                        Confirm password
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </div>
        </>
    );
}
