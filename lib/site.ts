const FALLBACK_ORIGIN = 'https://lifelog.be';

function resolveOrigin(): string {
    const raw = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_URL || FALLBACK_ORIGIN;
    try {
        const url = new URL(raw);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') return FALLBACK_ORIGIN;
        return url.origin;
    } catch {
        return FALLBACK_ORIGIN;
    }
}

export const SITE_ORIGIN = resolveOrigin();

const OWN_HOSTS = new Set(['lifelog.be', 'www.lifelog.be', new URL(SITE_ORIGIN).hostname]);

export function absoluteUrl(path = '/'): string {
    return new URL(path, SITE_ORIGIN).toString();
}

/**
 * Returns the canonical URL for an article. An editor-set canonical pointing to an
 * external site is kept; any variant of our own host is rewritten to SITE_ORIGIN.
 */
export function articleCanonical(slug: string, editorCanonical?: string | null): string {
    if (editorCanonical) {
        try {
            const url = new URL(editorCanonical);
            if (!OWN_HOSTS.has(url.hostname)) return url.toString();
        } catch {
            // ignore malformed editor values
        }
    }
    return absoluteUrl(`/${slug}`);
}

export const AUTHOR = {
    '@type': 'Person',
    name: 'Gijs Nelissen',
    url: absoluteUrl('/about'),
    sameAs: [
        'https://x.com/digitalbase',
        'https://github.com/digitalbase',
        'https://www.linkedin.com/in/gijsnelissen/',
    ],
} as const;

export function jsonLdScript(data: object) {
    return {
        type: 'application/ld+json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, '\\u003c') },
    };
}
