import type { Category } from '@prezly/sdk';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/TailwindSpotlight/Container';
import type { StoryWithImage } from '@/lib/types/types';
import { PrezlyApi } from '@/lib/utils/PrezlyApi';

import Header from './Header';
import StoryCard from './StoryCard';

async function getCategory(slug: string) {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );
    return api.getCategoryBySlug(slug);
}

async function getPostsForCategory(category: Category) {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );

    const { stories } = await api.getStoriesFromCategory(category, {
        pageSize: 100,
        include: ['thumbnail_image'],
    });

    return stories;
}

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
    const category = await getCategory(params.slug);

    if (!category) {
        return;
    }

    const seoTitle = `Category - ${category.i18n.en.name}`;
    const seoDescription = `This pages holds all stories in the ${category.i18n.en.name} category`;

    return {
        title: seoTitle,
        description: seoDescription,
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
        },
    };
}

export default async function StoryPage({ params }) {
    const category = await getCategory(params.slug);

    if (!category) {
        return <span>Not found</span>;
    }

    const posts = await getPostsForCategory(category);

    return (
        <Container className="mt-16 lg:mt-32">
            <Container className="mt-8 sm:px-8 mt-16 sm:mt-32">
                <div className="sm:mt-4 lg:grid lg:grid-cols-3 lg:items-center lg:gap-2 content-start">
                    <Header category={category} className="col-span-2" />

                    <div className="flex flex-col items-start sm:flex-row lg:mt-0 lg:justify-end">
                        <Link
                            target={'_blank'}
                            href={`/category/${
                                'i18n' in category ? category.i18n.en.slug : ''
                            }/feed`}
                            className="items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none flex-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
                        >
                            RSS Feed
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {posts.map((story) => (
                            <StoryCard story={story as StoryWithImage} key={story.id} />
                        ))}
                    </div>
                </div>
            </Container>
        </Container>
    );
}
