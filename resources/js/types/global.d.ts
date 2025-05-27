import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

type PaginatedCollection<T extends object> = {
    data: Array<T>;
    links: any,
    // meta: {
    current_page: number;
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    path: string;
    per_page: string;
    prev_page_url: string | null;
    to: number;
    total: number;
    // };
};
