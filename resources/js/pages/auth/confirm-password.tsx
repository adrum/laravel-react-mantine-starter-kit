import { Form, Head } from '@inertiajs/react';
import { Button, PasswordInput } from '@mantine/core';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

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
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
