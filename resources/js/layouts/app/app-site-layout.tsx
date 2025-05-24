import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';

function AppSiteLayout({ variant = 'primary', children }: { variant?: 'primary' | 'secondary'; children: React.ReactNode }) {
    return (
        <>
            <SiteHeader variant={variant} />
            {children}
            <Footer />
        </>
    );
}

export default AppSiteLayout;
