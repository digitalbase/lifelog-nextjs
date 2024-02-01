import '@prezly/content-renderer-react-js/styles.css';
import '@prezly/uploadcare-image/build/styles.css';
import '../styles/styles.globals.scss';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import { Providers } from './providers';

export const metadata = {
    title: {
        default: 'Gijs Nelissen',
        template: '%s | Lifelog.be',
    },
    description:
        'My personal blog where I write about (product) development, tech topics and ' +
        'lately about my life moving to Spain.',
    openGraph: {
        title: 'Lifelog.be - Gijs Nelissen',
        description:
            'My personal blog where I write about (product) development, tech topics and ' +
            'lately about my life moving to Spain.',
        url: 'https://lifelog.be',
        siteName: 'Lifelog',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Gijs Nelissen',
        card: 'summary_large_image',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://cdn.uc.assets.prezly.com" />
                <link rel="dns-prefetch" href="https://cdn.uc.assets.prezly.com" />
                <link rel="preconnect" href="https://proxy.uc.assets.prezly.com" />
                <link rel="dns-prefetch" href="https://proxy.uc.assets.prezly.com" />

                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />

                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />

                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
                <meta name="theme-color" content="#ffffff" />
            </head>
            <body className="flex h-full bg-zinc-50 dark:bg-black">
                <Providers>
                    <div className="flex w-full">
                        <div className="fixed inset-0 flex justify-center sm:px-8">
                            <div className="flex w-full max-w-7xl lg:px-8">
                                <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
                            </div>
                        </div>
                        <div className="relative flex w-full flex-col">
                            <Header />
                            <main className="flex-auto">{children}</main>
                            <Footer />
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
