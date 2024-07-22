import type { MetadataRoute } from 'next';

import { app } from '@/lib/adapters/app';
import {Sitemap} from "@prezly/theme-kit-nextjs";

const MINUTE = 60;

export const revalidate = 15 * MINUTE;

function generateUrl(type: string, object) {
    if (!object) return;
    if (!object.slug) return;

    switch (type) {
        case 'category':
            return `/category/${object?.slug}`
        case 'story':
            return `/${object?.slug}`
    }
    return '/';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    return Sitemap.generate(
        {
            generateUrl,
            categories: app().categories,
            newsroom: app().newsroom,
            locales: app().locales,
            stories: app().allStories,
        },
        {
            baseUrl: process.env.NEXT_PUBLIC_URL,
        },
    );
}

