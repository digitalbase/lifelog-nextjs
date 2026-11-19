import { getSiteUrl } from '@/lib/siteUrl';

import { categories } from '../topics/categories';

export const dynamic = 'force-static';

export function GET() {
    const url = getSiteUrl();
    const topics = categories
        .map((category) => `- [${category.name}](${url}/category/${category.slug})`)
        .join('\n');

    const body = `# Lifelog.be

> Personal blog of Gijs Nelissen, co-founder of Prezly.

## Topics

${topics}

## Pages

- [About](${url}/about)
- [Articles](${url}/articles)
- [Topics](${url}/topics)
- [Uses](${url}/uses)
- [RSS feed](${url}/feed.xml)
- [Sitemap](${url}/sitemap.xml)
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
