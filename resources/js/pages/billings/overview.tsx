import { Invoice, Plan, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import BillingsLayout from '@/layouts/billings/layout';
import { Button } from '@mantine/core';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billings',
        href: '/billings/overview',
    },
];

export default function Overview({
    plan,
    upcoming,
    total,
    description,
    is_canceled,
    invoices,
}: {
    plan: Plan;
    upcoming: {
        date: string;
        short_date: string;
    };
    description: string;
    total: string;
    is_canceled: boolean;
    invoices: Invoice[];
}) {
    console.log(invoices);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <BillingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Manage Subscription" description="Manage your subscription" />
                    {plan.title}
                    <br />
                    {upcoming && (
                        <p className="text-muted-foreground text-sm">
                            {description}: {upcoming.short_date} {upcoming.date}
                        </p>
                    )}

                    <p className="text-muted-foreground text-sm">Total: {total}</p>

                    <Button component="a" href={route('subscription.portal')}>
                        Manage
                    </Button>
                </div>

                <div className="space-y-6">
                    <HeadingSmall title="Control Subscription" description="Manage your subscription" />

                    {is_canceled ? (
                        <Button href={route('subscription.resume')} component={Link}>
                            Resume
                        </Button>
                    ) : (
                        <Button href={route('subscription.cancel')} component={Link}>
                            Cancel
                        </Button>
                    )}

                    <br />
                </div>

                <div className="space-y-6">
                    <HeadingSmall title="Invoices" description="List of your invoices" />

                    {invoices.length > 0
                        ? invoices.map((invoice: Invoice) => (
                              <>
                                  {invoice.date} - {invoice.total}{' '}
                                  <a
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={route('subscription.invoice', {
                                          invoice: invoice.id,
                                      })}
                                  >
                                      Download
                                  </a>
                                  <br />
                              </>
                          ))
                        : ''}

                    <br />

                    <Button component={Link} href={route('burat')}>
                        Shit
                    </Button>
                </div>
            </BillingsLayout>
        </AppLayout>
    );
}
