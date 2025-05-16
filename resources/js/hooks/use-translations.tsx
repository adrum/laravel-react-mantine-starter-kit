// hooks/useTranslation.ts
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export function useTranslation() {
    const { translations } = usePage<SharedData>().props;

    return (key: string, replacements: Record<string, string | number> = {}): string => {
        let translation: string = '';

        if (translations && typeof translations === 'object') {
            translation = Object.prototype.hasOwnProperty.call(translations, key)
                ? String(translations[key as keyof typeof translations])
                : key;
        } else {
            translation = key;
        }

        if (replacements && Object.keys(replacements).length > 0) {
            Object.keys(replacements).forEach((replacement) => {
                translation = translation.replace(`:${replacement}`, String(replacements[replacement]));
            });
        }

        return translation;
    };
}
