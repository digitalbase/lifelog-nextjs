import { Card } from '@/components/TailwindSpotlight/Card';
import { Container } from '@/components/TailwindSpotlight/Container';
import type { StoryWithImage } from '@/lib/types/types';
import { formatDate } from '@/lib/utils/formatDate';
import { PrezlyApi } from '@/lib/utils/PrezlyApi';

interface ArticleProps {
    article: StoryWithImage;
}

export const metadata = {
    title: 'All blog posts',
    description:
        'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
};

function Article({ article: story }: ArticleProps) {
    const dateAsString = story.published_at ?? '';
    return (
        <Card>
            <Card.Title slug={story.slug}>{story.title}</Card.Title>
            <Card.Eyebrow decorate>{formatDate(dateAsString)}</Card.Eyebrow>
            <Card.Description>{story.summary}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
        </Card>
    );
}

async function getStories() {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );
    const { stories } = await api.getStories({ pageSize: 100, include: ['thumbnail_image'] });

    return stories;
}

export default async function ArticlesPage() {
    const stories = await getStories();

    // @ts-ignore
    return (
        <>
            <Container className="mt-16 lg:mt-32">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Writing on software design, company building, and sometimes my personal life
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        All of my long-form thoughts on programming, leadership, product design, and
                        more, collected in chronological order.
                    </p>
                </div>
            </Container>
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {stories.map((story) => (
                            <Article key={story.slug} article={story as StoryWithImage} />
                        ))}
                    </div>
                </div>
            </Container>
            {/* <Stories stories={stories} pagination={pagination} /> */}
        </>
    );
}
