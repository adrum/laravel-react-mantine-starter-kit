import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { NativeSelect } from '@mantine/core';
import { useState } from 'react';

export function LanguageSelector() {
    const { languages, language } = usePage<SharedData>().props;

    const [selectedLanguage, setSelectedLanguage] = useState(language);

    function updateLanguage(lang: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedLanguage(lang.target.value);
        router.post(route('language.store'), { locale: lang.target.value }, { preserveScroll: true });
    }

    return (
        <NativeSelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateLanguage(e)}
            data={languages}
            value={selectedLanguage}
            styles={{
                input: {
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: 90,
                    fontWeight: 500,
                    width: 100,
                },
            }}
        />
    );
}
