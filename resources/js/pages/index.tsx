import { lazy, Suspense } from 'react';

// Import header and footer directly as they should appear immediately
import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';
import { useTranslation } from '@/hooks/use-translations';
import { Button, Text, Title } from '@mantine/core';

// Lazy load components that are not needed on initial render
const FAQ = lazy(() => import('@/components/site/faq').then((module) => ({ default: module.FAQ })));
const FeaturesCards = lazy(() => import('@/components/site/features-card').then((module) => ({ default: module.FeaturesCards })));

// Simple loading fallback
const LoadingFallback = () => <div className="py-4"></div>;

export default function Welcome() {
    const __ = useTranslation();

    return (
        <>
            <SiteHeader />
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

            <Suspense fallback={<LoadingFallback />}>
                <FeaturesCards />
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
                <FAQ />
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
                <FAQ />
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
                <FAQ />
            </Suspense>

            <Footer />
        </>
    );
}
