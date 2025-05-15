import { FAQ } from '@/components/site/faq';
import { FeaturesCards } from '@/components/site/features-card';
import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';
import { useTranslation } from '@/hooks/use-translations';
import { WhenVisible } from '@inertiajs/react';
import { Button, Text, Title } from '@mantine/core';

export default function Welcome() {
    const __ = useTranslation();

    return (
        <>
            <SiteHeader></SiteHeader>

            <div className="h-[700px]"></div>
            <div className="absolute inset-0 h-[700px]">
                <div className="relative !h-[700px] w-full">
                    <img
                        src="/mobile.webp"
                        alt="Banner"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="block h-full w-full object-cover brightness-70 sm:hidden"
                    />
                    <img
                        src="/desktop.webp"
                        alt="Banner"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="hidden h-full w-full object-cover brightness-70 sm:block"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                        <Title>{__('general.welcome_message')}</Title>
                        <Text className="!mb-2">Discover amazing content and connect with creators around the world.</Text>
                        <Button variant="gradient">Get Started</Button>
                    </div>
                </div>
            </div>


            <WhenVisible data="feat" fallback={<div></div>}>
                <FeaturesCards />
            </WhenVisible>

            <WhenVisible data="faq1" fallback={<div></div>}>
                <FAQ />
            </WhenVisible>

            <WhenVisible data="faq2" fallback={<div></div>}>
                <FAQ />
            </WhenVisible>

            <WhenVisible data="faq3" fallback={<div></div>}>
                <FAQ />
            </WhenVisible>

            <WhenVisible data="faq4" fallback={<div></div>}>
                <FAQ />
            </WhenVisible>

            <WhenVisible data="footer" fallback={<div></div>}>
                <Footer></Footer>
            </WhenVisible>
        </>
    );
}
