import { StoryFormatVersion } from '@prezly/sdk';
import { PrezlyApi } from '@prezly/theme-kit-nextjs/src/data-fetching/api/PrezlyApi';
import Link from 'next/link';

import SlateRenderer from '@/components/SlateRenderer';
import { Container } from '@/components/TailwindSpotlight/Container';
import { Prose } from '@/components/TailwindSpotlight/Prose';
import { formatDate } from '@/utils/formatDate';

async function getStory(slug: string) {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN,
        process.env.PREZLY_NEWSROOM_UUID,
        process.env.PREZLY_THEME_UUID,
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

export default async function StoryPage({ params }) {
    const story = await getStory(params.slug);

    if (!story) {
        return <span>Not found</span>;
    }

    const { title, published_at, content, format_version } = story;

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
                            {format_version === StoryFormatVersion.SLATEJS && (
                                <SlateRenderer nodes={JSON.parse(content as string)} />
                            )}
                        </div>
                    </article>
                </div>
            </div>
        </Container>
    );
}
