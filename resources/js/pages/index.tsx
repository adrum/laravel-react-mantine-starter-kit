import { FAQ } from '@/components/site/faq';
import { FeaturesCards } from '@/components/site/features-card';
import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <SiteHeader>
            </SiteHeader>
            <FeaturesCards />
            <FAQ />

            <Footer>
            </Footer>
        </>
    );
}
