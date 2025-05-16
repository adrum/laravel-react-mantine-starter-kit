import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations } = usePage<SharedData>().props;

    return (key: string, replacements: Record<string, string | number> = {}): string => {
        let translation = translations?.[key] ?? key;

        Object.entries(replacements).forEach(([placeholder, value]) => {
            translation = translation.replaceAll(`:${placeholder}`, String(value));
        });

        return translation;
    };
}
