type PrivacyPortalUrlOptions = {
    email?: string;
    action?: 'data-request' | 'subscribe' | 'unsubscribe';
};

export function getPrivacyPortalUrl(options?: PrivacyPortalUrlOptions) {
    const { email, action = 'subscribe' } = options || {};

    const url = new URL(
        `/newsroom/b8c9ac36-090e-443a-b006-2c01578a1ba1/${action}`,
        'https://privacy.prezly.com',
    );
    if (email) {
        url.searchParams.append('email', email);
    }
    return url.toString();
}
