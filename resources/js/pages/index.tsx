import { CardCarousel } from '@/components/mantine-modules/card-carousel';
import { HeroBullets } from '@/components/mantine-modules/hero-bullets';
import { FAQ } from '@/components/site/faq';
import { FeaturesCards } from '@/components/site/features-card';
import SiteLayout from '@/layouts/site-layout';

export default function Welcome() {
    return (
        <>
            <SiteLayout variant="secondary">
                <section className="motion-preset-blur-up motion-duration-[2s] py-16" style={{ animationDelay: '1000ms' }}>
                    <HeroBullets />
                </section>

                <section className="motion-preset-blur-up motion-duration-[2s] py-16" style={{ animationDelay: '1000ms' }}>
                    <FeaturesCards />
                </section>

                <section className="motion-preset-blur-up motion-duration-[2s] py-16" style={{ animationDelay: '1000ms' }}>
                    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                        <CardCarousel />
                        <CardCarousel />
                        <CardCarousel />
                    </div>
                </section>

                <FAQ />
            </SiteLayout>
        </>
    );
}
