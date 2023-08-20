import '@prezly/content-renderer-react-js/styles.css';
import '@prezly/uploadcare-image/build/styles.css';
import '../styles/styles.globals.scss';
import { Layout } from '@/components/Layout';

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
            <body className="flex h-full bg-zinc-50 dark:bg-black">
                <Providers>
                    <div className="flex w-full">
                        <Layout>{children}</Layout>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
