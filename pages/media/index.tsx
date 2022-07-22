import { type GalleryPageProps, getGalleryPageStaticProps } from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { importMessages, isTrackingEnabled, loadFeaturedStories } from '@/utils';
import type { BasePageProps } from 'types';

const Galleries = dynamic(() => import('@/modules/Galleries'), { ssr: true });

type Props = BasePageProps & GalleryPageProps;

const GalleriesPage: FunctionComponent<Props> = ({ galleries, pagination }) => (
    <Galleries initialGalleries={galleries} pagination={pagination} />
);

export const getStaticProps = getGalleryPageStaticProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
        featuredStories: await loadFeaturedStories(context),
    }),
);

export default GalleriesPage;
