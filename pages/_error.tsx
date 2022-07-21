/**
 * We need to fetch some data in order to show a layout for 404 page.
 * That is why generic component was created, because neither `getServerSideProps`
 * nor `getInitialProps` are supported by Next.js for 404.txt and 500.tsx pages.
 */

import type { PageProps } from '@prezly/theme-kit-nextjs';
import { getPrezlyApi } from '@prezly/theme-kit-nextjs';
import * as Sentry from '@sentry/nextjs';
import type { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import type { ErrorProps } from 'next/error';
import NextError from 'next/error';

import { importMessages, loadFeaturedStories } from '@/utils';
import type { BasePageProps } from 'types';

const NotFound = dynamic(() => import('@/modules/Errors/NotFound'), { ssr: true });

enum StatusCode {
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

type ErrorPropsWithExtraSentryProps = ErrorProps & {
    hasGetInitialPropsRun: boolean;
    error?: Error | null;
};

type NotFoundProps = {
    statusCode: StatusCode.NOT_FOUND;
} & BasePageProps;
type InternalServerErrorProps = {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR;
};
type Props = ErrorPropsWithExtraSentryProps & (NotFoundProps | InternalServerErrorProps);

const ErrorPage: NextPage<Props> = (props) => {
    const { error, hasGetInitialPropsRun } = props;
    if (!hasGetInitialPropsRun && error) {
        // getInitialProps is not called in case of
        // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
        // err via _app.js so it can be captured
        Sentry.captureException(error);
        // Flushing is not required in this case as it only happens on the client
    }

    const { statusCode } = props;

    if (statusCode === StatusCode.NOT_FOUND) {
        return <NotFound />;
    }

    return <NextError statusCode={statusCode} />;
};

// TODO: This seems to trigger on client side sometimes, which causes crashing
ErrorPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
    const { req: request, res: response, err: error, asPath, locale } = context;

    // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
    // getInitialProps has run
    const baseInitialProps = {
        ...(await NextError.getInitialProps(context)),
        hasGetInitialPropsRun: true,
        error,
    };

    const statusCode: StatusCode = response?.statusCode || error?.statusCode || 404;

    let extraInitialProps: NotFoundProps | InternalServerErrorProps;
    if (statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
        extraInitialProps = { statusCode } as InternalServerErrorProps;
    } else {
        const api = getPrezlyApi(request);
        const { newsroomContextProps } = await api.getNewsroomServerSideProps(request, locale);
        const translations = await importMessages(newsroomContextProps.localeCode);
        const featuredStories = await loadFeaturedStories(context);

        extraInitialProps = {
            newsroomContextProps,
            statusCode,
            translations,
            featuredStories,
        } as NotFoundProps & PageProps;
    }

    // Running on the server, the response object (`res`) is available.
    //
    // Next.js will pass an err on the server if a page's data fetching methods
    // threw or returned a Promise that rejected
    //
    // Running on the client (browser), Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html

    if (error && statusCode !== StatusCode.NOT_FOUND) {
        Sentry.captureException(error);

        // Flushing before returning is necessary if deploying to Vercel, see
        // https://vercel.com/docs/platform/limits#streaming-responses
        await Sentry.flush(2000);

        return { ...baseInitialProps, ...extraInitialProps };
    }

    // No need to trigger a Sentry error if user lands on 404
    if (statusCode !== StatusCode.NOT_FOUND) {
        // If this point is reached, getInitialProps was called without any
        // information about what the error might be. This is unexpected and may
        // indicate a bug introduced in Next.js, so record it in Sentry
        Sentry.captureException(
            new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
        );
        await Sentry.flush(2000);
    }

    return { ...baseInitialProps, ...extraInitialProps };
};

export default ErrorPage;
