'use client';

import { AnalyticsContextProvider } from '@prezly/analytics-nextjs';
import { usePathname } from 'next/navigation';
import PlausibleProvider from 'next-plausible';
import { createContext, useEffect, useRef } from 'react';

function usePrevious(value: any) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

// @ts-ignore
export const AppContext = createContext();

// @ts-ignore
export function Providers({ children }) {
    const pathname = usePathname();
    const previousPathname = usePrevious(pathname);

    return (
        <AppContext.Provider value={{ previousPathname }}>
            <AnalyticsContextProvider isEnabled={false}>
                <PlausibleProvider
                    domain="lifelog.be"
                    scriptProps={{
                        src: '/js/pl.js',
                        // @ts-expect-error
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'data-api': '/api/pl',
                    }}
                >
                    {children}
                </PlausibleProvider>
            </AnalyticsContextProvider>
        </AppContext.Provider>
    );
}
