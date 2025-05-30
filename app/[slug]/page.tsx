import { Story } from '@prezly/sdk';
import Link from 'next/link';

import { Container } from '@/components/TailwindSpotlight/Container';
import { formatDate } from '@/lib/utils/formatDate';
import { PrezlyApi } from '@/lib/utils/PrezlyApi';

import Visibility = Story.Visibility;

import type { Metadata } from 'next';
import ContentRenderer from "@/components/ContentRenderer";

export async function generateStaticParams() {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );

    const stories = await api.getAllStories();
    return stories
        .filter((story) => story.status === 'published' && story.visibility === 'public')
        .map((story) => ({
            localeCode: story.culture.code,
            slug: story.slug,
        }));
}

async function getStory(slug: string) {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );
    return api.getStoryBySlug(slug);
}

interface IconTypeProps {
    className: string;
}

function ArrowLeftIcon({ className }: IconTypeProps) {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
            <path
                d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
    const story = await getStory(params.slug);

    if (!story) return;

    const { title, subtitle, oembed, newsroom, summary } = story;

    const seoTitle =
        story.seo_settings.meta_title || story.seo_settings.default_meta_title || title;
    const seoDescription =
        story.seo_settings.meta_description ||
        story.seo_settings.default_meta_description ||
        subtitle ||
        summary;
    const canonical = story.seo_settings.canonical_url || oembed.url;
    const indexable = story.visibility === Visibility.PUBLIC;

    return {
        title: seoTitle,
        description: seoDescription,
        alternates: {
            canonical,
        },
        robots: {
            index: indexable,
            follow: true,
            nocache: true,
        },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: oembed.url,
            ...(oembed.thumbnail_url && {
                images: [
                    {
                        url: oembed.thumbnail_url,
                        alt: oembed.title,
                        width: oembed.thumbnail_width,
                        height: oembed.thumbnail_height,
                    },
                ],
            }),
        },
    };
}

// @ts-ignore
export default async function StoryPage({ params }) {
    const story = await getStory(params.slug);

    if (!story) {
        return <span>Not found</span>;
    }

    const { title, published_at, content } = story;
    const nodes = JSON.parse(content);

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    <Link
                        type="button"
                        href="/articles"
                        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
                    >
                        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                    </Link>
                    <article>
                        <header className="flex flex-col">
                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                {title}
                            </h1>
                            <time
                                dateTime={published_at ?? ''}
                                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                            >
                                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                                <span className="ml-3"> {formatDate(published_at ?? '')}</span>
                            </time>
                        </header>
                        <div className="prose lg:prose-xl dark:prose-invert e-content">
                            <ContentRenderer nodes={nodes} />
                        </div>
                    </article>
                </div>
            </div>
        </Container>
    );
}
