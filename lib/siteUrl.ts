const FALLBACK_SITE_URL = 'https://lifelog.be';

export function getSiteUrl(): string {
    const value = process.env.NEXT_PUBLIC_URL;
    if (!value) return FALLBACK_SITE_URL;

    try {
        const url = new URL(value);
        if (url.protocol !== 'https:') return FALLBACK_SITE_URL;
        return url.origin;
    } catch {
        return FALLBACK_SITE_URL;
    }
}
