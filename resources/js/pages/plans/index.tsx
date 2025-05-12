import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';

interface Plan {
    price_id: number;
    name: string;
}

interface IndexProps {
    monthly: Plan;
    yearly: Plan;
}

export default function Index({ monthly, yearly }: IndexProps) {
    return (
        <>
            <SiteHeader></SiteHeader>
            <div>
                {monthly.name}
                {monthly.price_id}
                <a
                    href={route('checkout', {
                        plan: 'monthly',
                    })}
                >
                    Checkout
                </a>

                <br />
                {yearly.name}
                {yearly.price_id}
                <a
                    href={route('checkout', {
                        plan: 'yearly',
                    })}
                >
                    Checkout
                </a>
            </div>
            <Footer></Footer>
        </>
    );
}
