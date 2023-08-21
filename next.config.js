// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const path = require('path');

const globalSassImports = `\
    @import "styles/variables";
    @import "styles/mixins";
`;

const moduleExports = withBundleAnalyzer({
    async rewrites() {
        return [
            {
                source: '/feed',
                destination: '/api/rss?format=xml',
            },
            {
                source: '/category/:category/feed',
                destination: '/api/rss?format=xml',
            },
            {
                source: '/feed.xml',
                destination: '/api/rss?format=xml',
            },
            {
                source: '/feed.json',
                destination: '/api/rss?format=json',
            },
            {
                source: '/feed.atom',
                destination: '/api/rss?format=atom',
            },
            {
                source: '/js/pl.js',
                destination: 'https://plausible.io/js/plausible.js',
            },
            {
                source: '/api/pl', // Or '/api/event/' if you have `trailingSlash: true` in this config
                destination: 'https://plausible.io/api/event',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: 'upgrade-insecure-requests; report-uri https://prezly.report-uri.com/r/d/csp/enforce;',
                    },
                ],
            },
        ];
    },
    images: {
        domains: ['cdn.uc.assets.prezly.com', 'ucarecdn.com'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: globalSassImports,
    },
    eslint: {
        dirs: ['components', 'contexts', 'hooks', 'modules', 'utils'],
    },
    experimental: {
        newNextLinkBehavior: true,
        scrollRestoration: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
});

module.exports = moduleExports;
