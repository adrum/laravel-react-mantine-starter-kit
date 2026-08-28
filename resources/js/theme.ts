import { Link } from '@inertiajs/react';
import {
    Anchor,
    Button,
    Checkbox,
    JsonInput,
    Menu,
    MultiSelect,
    NativeSelect,
    NumberInput,
    PasswordInput,
    Select,
    TextInput,
    Textarea,
    createTheme,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { colors } from './colors';

const InputStyles = {
    label: {
        color: 'var(--foreground)',
    },
    wrapper: {
        '--input-bd': 'var(--border)',
        '--input-bd-focus': 'var(--color-primary-500)',
        '&:focusWithin': {
            '--input-bd': 'var(--color-primary-500)',
        },
    },
    input: {
        color: 'var(--foreground)',
        backgroundColor: 'transparent',
    },
};

const theme = createTheme({
    colors,

    primaryColor: 'primary',

    primaryShade: 5,

    defaultRadius: 'md',

    autoContrast: true,

    components: {
        Anchor: Anchor.extend({
            defaultProps: {
                component: Link,
                underline: 'always',
                classNames: {
                    root: 'text-foreground! hover:text-accent',
                },
            },
        }),
        Button: Button.extend({
            defaultProps: {
                size: 'md',
                classNames: {
                    root: 'rounded-full',
                },
            },
        }),
        TextInput: TextInput.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        PasswordInput: PasswordInput.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        Textarea: Textarea.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        JsonInput: JsonInput.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        DateTimePicker: DateTimePicker.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        NumberInput: NumberInput.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        NativeSelect: NativeSelect.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        Select: Select.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        MultiSelect: MultiSelect.extend({
            defaultProps: {
                size: 'md',
                classNames: {
                    input: 'border-0',
                    pill: 'border border-gray-800',
                },
            },
        }),
        Checkbox: Checkbox.extend({
            defaultProps: {
                size: 'md',
                styles: {
                    label: {
                        color: 'var(--foreground)',
                    },
                },
            },
        }),
        Menu: Menu.extend({
            defaultProps: {
                classNames: {
                    item: 'bg-background hover:bg-muted!',
                    label: 'text-foreground',
                    itemLabel: 'text-foreground',
                },
                styles: {
                    dropdown: {
                        backgroundColor: 'var(--background)',
                        border: 'var(--border)',
                    },
                    divider: {
                        borderColor: 'var(--border)',
                    },
                    item: {
                        background: 'transparent',
                    },
                },
            },
        }),
    },
});

export default theme;
