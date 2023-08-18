import classNames from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/TailwindSpotlight/Card';
import { Container } from '@/components/TailwindSpotlight/Container';
import SocialLink from '@/components/TailwindSpotlight/Extracted/SocialLink';
import {
    GitHubIcon,
    LinkedInIcon,
    RssFeedIcon,
    TwitterIcon,
} from '@/components/TailwindSpotlight/SocialIcons';
import SubscribeForm from '@/modules/Layout/SubscribeForm';
import { formatDate } from '@/utils/formatDate';
import { PrezlyApi } from '@/utils/PrezlyApi';
import type { StoryWithImage } from 'types';

import image2 from '@/public/images/gijs-ball.jpeg';
import image4 from '@/public/images/gijs-desk.jpeg';
import image3 from '@/public/images/gijs-outlook.jpeg';
import image5 from '@/public/images/gijs-ski.jpeg';
import image1 from '@/public/images/gijs-zoom.jpeg';

interface ArticleProps {
    article: StoryWithImage;
}

function Article({ article: story }: ArticleProps) {
    const dateAsString = story.published_at ?? '';
    return (
        <Card>
            <Card.Title href={story.slug}>{story.title}</Card.Title>
            <Card.Eyebrow decorate>{formatDate(dateAsString)}</Card.Eyebrow>
            <Card.Description>{story.summary}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
        </Card>
    );
}

function Photos() {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={classNames(
                            'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                            rotations[imageIndex % rotations.length],
                        )}
                    >
                        <Image
                            src={image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

async function getStories() {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );
    const { stories } = await api.getStories({ pageSize: 4, include: ['thumbnail_image'] });

    return stories;
}

export default async function HomePage() {
    const stories = await getStories();
    return (
        <>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Software designer, techie, father and co-founder.
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        I’m Gijs, a software designer and entrepreneur from Belgium. Currently based
                        in 🇪🇸 Spain. Co-founder of{' '}
                        <Link href="https://www.prezly.com/about" className="hyperlink">
                            Prezly
                        </Link>
                        , where we are building tools to make it easy to build fans through great
                        content.
                    </p>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        On this blog I write about product management, company culture, tech topics
                        and lately sometimes about{' '}
                        <Link href="/about" className="hyperlink">
                            my personal life
                        </Link>
                        .
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            href="https://twitter.com/digitalbase"
                            ariaLabel="Follow on Twitter"
                            icon={TwitterIcon}
                        />
                        <SocialLink
                            href="https://github.com/digitalbase"
                            ariaLabel="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            href="https://www.linkedin.com/in/gijsnelissen/"
                            ariaLabel="Connect on LinkedIn"
                            icon={LinkedInIcon}
                        />
                        <SocialLink
                            href="https://lifelog.be/feed.xml"
                            ariaLabel="RSS Feed"
                            icon={RssFeedIcon}
                        />
                    </div>
                </div>
            </Container>
            <Photos />
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {stories.map((story) => (
                            <Article key={story.slug} article={story as StoryWithImage} />
                        ))}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <SubscribeForm />
                    </div>
                </div>
            </Container>
        </>
    );
}
