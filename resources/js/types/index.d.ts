import { Icon } from '@tabler/icons-react';
import type { Config } from 'ziggy-js';
import { SocialAccount } from './socialite-ui';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: Icon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    languages: { label: string; value: string }[];
    translations: [];
    language: string;
    [key: string]: unknown;
}

export interface Socials {
    github: boolean;
    facebook: boolean;
    x: boolean;
    google: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    social_accounts: SocialAccount[];
    [key: string]: unknown; // This allows for additional properties...
}
