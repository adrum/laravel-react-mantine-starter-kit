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

import { Link } from '@inertiajs/react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const InputStyles = {
    label: {
        color: 'var(--foreground)',
    },
    input: {
        color: 'var(--foreground)',
        backgroundColor: 'transparent',
    },
};

import { MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = ['#fff0e4', '#ffe0cf', '#fac0a1', '#f69e6e', '#f28043', '#f06e27', '#f06418', '#d6530c', '#bf4906', '#a73c00'];

const theme = createTheme({
    primaryColor: 'myColor',
    defaultGradient: {
        from: '#af5a00',
        to: '#fca13a',
        deg: 45,
    },
    colors: {
        myColor,
    },
    fontFamily: 'default, sans-serif',
    defaultRadius: 'md',
    components: {
        Anchor: Anchor.extend({
            defaultProps: {
                // @ts-expect-error - Component is not defined in the Mantine core props
                component: Link,
                underline: 'always',
                classNames: {
                    root: 'text-foreground! hover:text-accent',
                },
            },
        }),
        Button: Button.extend({
            defaultProps: {
                size: 'sm',
                classNames: {
                    root: '!rounded-full !pt-1',
                },
            },
        }),
        TextInput: TextInput.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        PasswordInput: PasswordInput.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        Textarea: Textarea.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        JsonInput: JsonInput.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        DateTimePicker: DateTimePicker.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        NumberInput: NumberInput.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        NativeSelect: NativeSelect.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        Select: Select.extend({
            defaultProps: {
                size: 'sm',
                styles: {
                    ...InputStyles,
                },
            },
        }),
        MultiSelect: MultiSelect.extend({
            defaultProps: {
                size: 'sm',
                classNames: {
                    input: 'border-0',
                    pill: 'border border-gray-800',
                },
            },
        }),
        Checkbox: Checkbox.extend({
            defaultProps: {
                size: 'sm',
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
