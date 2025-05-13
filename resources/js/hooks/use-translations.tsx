// hooks/useTranslation.ts
import { usePage } from '@inertiajs/react';
import { SharedData } from './types';

export function useTranslation() {
    const translations = usePage<SharedData>().props.translations;

    return (key: string, replacements: Record<string, string | number> = {}): string => {
        let translation: string = translations[key] || key;

        Object.keys(replacements).forEach((replacement) => {
            translation = translation.replace(`:${replacement}`, String(replacements[replacement]));
        });

        return translation;
    };
}
