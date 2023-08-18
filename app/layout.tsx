import '@prezly/content-renderer-react-js/styles.css';
import '@prezly/uploadcare-image/build/styles.css';
import '../styles/styles.globals.scss';
import { Layout } from '@/components/Layout';

import { Providers } from './providers';

export const metadata = {
    title: 'Lifelog.be - Gijs Nelissen',
    description:
        'My personal blog where I write about (product) development, tech topics and lately about my life moving to Spain.',
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
