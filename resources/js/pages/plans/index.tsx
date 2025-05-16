import { Footer } from '@/components/site/footer';
import { SiteHeader } from '@/components/site/header';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Plan {
    price_id: number;
    name: string;
}

interface IndexProps {
    monthly: Plan;
    yearly: Plan;
}

export default function Index({ monthly, yearly }: IndexProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    // Common features for both plans
    const features = ['Full access to all features', 'Priority customer support', 'Regular updates', 'Unlimited projects', 'API access'];

    // Calculate savings percentage for yearly plan (assuming yearly is cheaper)
    const monthlySavings = 20; // Example: 20% savings with yearly plan

    return (
        <>
            <Head title="Subscription Plans" />
            <SiteHeader variant="primary" />

            <main className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">Choose the Right Plan for You</h1>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Simple, transparent pricing that grows with your needs</p>
                    </div>

                    {/* Billing toggle */}
                    <div className="mt-12 flex justify-center">
                        <div className="relative inline-flex rounded-lg bg-white p-1">
                            <button
                                type="button"
                                className={`${
                                    billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-300'
                                } relative rounded-md px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                onClick={() => setBillingCycle('monthly')}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                className={`${
                                    billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-300'
                                } relative rounded-md px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                onClick={() => setBillingCycle('yearly')}
                            >
                                Yearly
                                <span className="absolute -top-2 -right-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                                    Save {monthlySavings}%
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing cards */}
                    <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-4xl lg:grid-cols-2">
                        {/* Monthly plan card */}
                        <div
                            className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${billingCycle === 'monthly' ? 'ring-2 ring-indigo-600' : ''}`}
                        >
                            <div className="bg-white px-6 py-8 sm:p-10 sm:pb-6">
                                <div>
                                    <h3 className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold tracking-wide text-indigo-600 uppercase dark:bg-indigo-900 dark:text-indigo-200">
                                        {monthly.name}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                                    ${(monthly.price_id / 100).toFixed(2)}
                                    <span className="ml-1 text-2xl font-medium text-gray-500 dark:text-gray-400">/mo</span>
                                </div>
                                <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">Perfect for individuals and small teams.</p>
                            </div>
                            <div className="flex flex-1 flex-col justify-between space-y-6 px-6 pt-6 pb-8 sm:p-10 sm:pt-6 dark:bg-gray-900">
                                <ul className="space-y-4">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className="h-6 w-6 text-green-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="rounded-md shadow">
                                    <a
                                        href={route('checkout', { plan: 'monthly' })}
                                        className={`flex w-full items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium text-white ${billingCycle === 'monthly' ? 'bg-indigo-600 hover:bg-indigo-700' : 'hover:bg-gray-700'} transition-colors duration-150`}
                                    >
                                        Get started
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Yearly plan card */}
                        <div
                            className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${billingCycle === 'yearly' ? 'ring-2 ring-indigo-600' : ''}`}
                        >
                            <div className="bg-white px-6 py-8 sm:p-10 sm:pb-6">
                                <div>
                                    <h3 className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold tracking-wide text-indigo-600 uppercase dark:bg-indigo-900 dark:text-indigo-200">
                                        {yearly.name}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                                    ${(yearly.price_id / 100 / 12).toFixed(2)}
                                    <span className="ml-1 text-2xl font-medium text-gray-500 dark:text-gray-400">/mo</span>
                                </div>
                                <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
                                    Billed annually (${(yearly.price_id / 100).toFixed(2)}/year)
                                </p>
                            </div>
                            <div className="flex flex-1 flex-col justify-between space-y-6 px-6 pt-6 pb-8 sm:p-10 sm:pt-6 dark:bg-gray-900">
                                <ul className="space-y-4">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className="h-6 w-6 text-green-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="rounded-md shadow">
                                    <a
                                        href={route('checkout', { plan: 'yearly' })}
                                        className={`flex w-full items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium text-white ${billingCycle === 'yearly' ? 'bg-indigo-600 hover:bg-indigo-700' : 'hover:bg-gray-700'} transition-colors duration-150`}
                                    >
                                        Get started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Have questions about our pricing?{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                Contact our sales team
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
