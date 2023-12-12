import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/TailwindSpotlight/Container';
import type { StoryWithImage } from '@/lib/types/types';

import Header from './Header';
import StoryCard from './StoryCard';
import {app} from "@/lib/adapters/app";
import {notFound} from "next/navigation";
import {Category} from "@prezly/sdk";

interface Props {
    params: {
        localeCode: 'en';
        slug: NonNullable<Category.Translation['slug']>;
    };
}

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
    const category = await resolveCategory(params.slug);

    console.log(category);

    if (!category) {
        return;
    }

    const seoTitle = `Category - ${category.name}`;
    const seoDescription = `This pages holds all stories in the ${category.name} category`;

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

export async function generateStaticParams() {
    const categories = await app().categories();
    return Category.translations(categories).map((category) => ({
        localeCode: 'en',
        slug: category.slug,
    }));
}

async function resolveCategory(slug: string) {
    return await app().translatedCategory('en', slug);
}

export default async function StoryPage({ params }) {
    const category = await resolveCategory(params.slug);

    console.log('category', category);

    //const category = await app().category(id);

    if (!category) {
        return <span>Not found</span>;
    }

    const { stories, pagination } = await app().stories({
        limit: 100,
        category,
        locale: { code: 'en' },
    });

    return (
        <Container className="mt-16 lg:mt-32">
            <Container className="mt-8 sm:px-8 mt-16 sm:mt-32">
                <div className="sm:mt-4 lg:grid lg:grid-cols-3 lg:items-center lg:gap-2 content-start">
                    <Header category={category} className="col-span-2" />

                    <div className="flex flex-col items-start sm:flex-row lg:mt-0 lg:justify-end">
                        <Link
                            target={'_blank'}
                            href={`/feed.xml?category=${category.slug}`}
                            className="items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none flex-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
                        >
                            RSS Feed
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {stories.map((story) => (
                            <StoryCard story={story as StoryWithImage} key={story.id} />
                        ))}
                    </div>
                </div>
            </Container>
        </Container>
    );
}
