import { CardCarousel } from '@/components/mantine-modules/card-carousel';
import { HeroBullets } from '@/components/mantine-modules/hero-bullets';
import { FAQ } from '@/components/site/faq';
import { FeaturesCards } from '@/components/site/features-card';
import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';

export default function Welcome() {

    return (
        <>
            <SiteHeader variant='primary'></SiteHeader>
            <HeroBullets />
            <FeaturesCards />

            <div className="mx-auto max-w-7xl grid grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                <CardCarousel />
                <CardCarousel />
                <CardCarousel />
            </div>

            <FAQ />
            <Footer></Footer>
        </>
    );
}
