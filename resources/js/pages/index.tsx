import { FAQ } from '@/components/site/faq';
import { FeaturesCards } from '@/components/site/features-card';
import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';
import { useTranslation } from '@/hooks/use-translations';
import { Button, Text, Title } from '@mantine/core';
//import { type SharedData } from '@/types';
//import {  usePage } from '@inertiajs/react';

export default function Welcome() {
    const __ = useTranslation();

    console.log();

    return (
        <>
            <SiteHeader></SiteHeader>

            <div className="h-[700px]"></div>
            <div className="absolute inset-0 h-[700px]">
                <div className="relative !h-[700px] w-full">
                    <img src="/banner.jpg" className="h-full w-full object-cover brightness-70" alt="Banner" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                        <Title>{__('general.welcome_message')}</Title>
                        <Text className="!mb-2">Discover amazing content and connect with creators around the world.</Text>
                        <Button variant="gradient">Get Started</Button>
                    </div>
                </div>
            </div>

            <FeaturesCards />
            <FAQ />
            <FAQ />
            <FAQ />

            <Footer></Footer>
        </>
    );
}
