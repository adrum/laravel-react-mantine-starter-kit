import type { MantineColorsTuple } from '@mantine/core';
import twColors from 'tailwindcss/colors';

/**
 * Generate a Mantine color tuple from Tailwind CSS variables.
 * Tailwind v4 exposes colors as --color-{name}-{shade} CSS variables.
 */
function createTailwindColor(
    color: Record<string, string>,
): MantineColorsTuple {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
    return shades.map((shade) => color[shade]) as unknown as MantineColorsTuple;
}

/**
 * Generate a color tuple from custom CSS variables (like --org-50, --platform-50).
 * These must be defined in your CSS (e.g., app.css) for each shade 50-900.
 */
function createCustomColor(prefix: string): MantineColorsTuple {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    return shades.map(
        (shade) => `var(--${prefix}-${shade})`,
    ) as unknown as MantineColorsTuple;
}

// Custom colors defined via CSS variables in app.css
const customColors = {
    primary: 'primary',
    brand: 'brand',
    dark: 'dark',
} as const;

type TailwindColors = keyof typeof twColors;

// Custom app color names
type CustomColors = keyof typeof customColors;

// Export type for all valid color names (Tailwind + custom only, no Mantine defaults)
export type AppColor = TailwindColors | CustomColors;

// Module augmentation to override Mantine's color types
// This ensures TypeScript errors if you use invalid colors like "grape"
// https://mantine.dev/theming/colors/#add-custom-colors-types
declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<AppColor, MantineColorsTuple>;
    }
}

// Tailwind color palette converted to Mantine format
const colors = {
    // Tailwind colors
    ...Object.fromEntries(
        Object.entries(twColors).map(([key, value]) => [
            key,
            createTailwindColor(value as Record<string, string>),
        ]),
    ),

    // Custom CSS variable colors
    ...Object.fromEntries(
        Object.entries(customColors).map(([key, value]) => [
            key,
            createCustomColor(value),
        ]),
    ),
};

export { colors };
