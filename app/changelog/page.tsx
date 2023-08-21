import Link from 'next/link';
import type { ReactNode } from 'react';

import { Card } from '@/components/TailwindSpotlight/Card';
import { Container } from '@/components/TailwindSpotlight/Container';
import { Section } from '@/components/TailwindSpotlight/Section';

interface EntryProps {
    title: string;
    children: ReactNode;
}

const title = 'Changelog';
const description = 'Inspired on a post by Brian Lovin about keeping a personal changelog';

export const metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    }
};

function Entry({ children, ...props }: EntryProps) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}

interface DetailProps {
    title: string;
    href?: string;
    children: ReactNode;
}

function Detail({ title, href, children }: DetailProps ) {
    return (
        <Card>
            <Card.Title href={href ?? ''}>{title}</Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

export default function Topics() {
    return (
        <Container className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    My personal changelog.
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    Inspired on <Link href="https://brianlovin.com/writing/make-a-personal-changelog" className="hyperlink">a post by Brian Lovin</Link>
                    {` `}about keeping a personal changelog. I'll try to update this page whenever I change stuff on this site or have updates for other personal projects I'm working on..
                </p>
            </header>
            <div className="mt-16 sm:mt-20">
                <div className="space-y-20">
                    <Entry title="August 21, 2023">
                        <Detail title="Added Changelog">
                                Added a page to the website to keep a track of the things I'm working on and whenever I'm changing things to the website.
                                Backfilled the page with the entries I knew about. It's clear that I spend more time updating this blog than writing actual content.
                        </Detail>
                    </Entry>

                </div>
            </div>
            <div className="mt-16 sm:mt-20">
                <div className="space-y-20">
                    <Entry title="August 19, 2023">
                        <Detail title="Upgrade to Next 13">
                            Took a few hours over the weekend to upgrade the blog from Next12 to Next13. Moved everything to
                            AppRouter and got rid of a ton of old/unused/boilerplate code.
                        </Detail>
                        <Detail title="Updated /uses and /about page">
                            Updated 2 items in the hardware list (Monitor and Mouse) and one in the software list. See if you can spot the change on /about
                        </Detail>
                    </Entry>

                </div>
            </div>
            <div className="mt-16 sm:mt-20">
                <div className="space-y-20">
                    <Entry title="November 14, 2022">
                        <Detail title="RSS Feeds">
                            Implemented an RSS feed for the homepage and the category pages. <Link href="indiewebifying-my-blog-part-1" className="hyperlink">Wrote a blog post</Link>
                        </Detail>

                        <Detail title="Subscribe Form">
                            Hooked up the homepage subscribe form to the prezly/sdk to get contacts to appear in the CRM.
                        </Detail>
                    </Entry>
                </div>
            </div>
            <div className="mt-16 sm:mt-20">
                <div className="space-y-20">
                    <Entry title="September 4, 2022">
                        <Detail title="New Blog Theme">
                            Purchased a TailwindUI licence and applied the layout of <Link href="https://tailwindui.com/templates/spotlight" className="hyperlink">TailwindUI Spotlight</Link> theme on the blog.
                        </Detail>
                    </Entry>
                </div>
            </div>
            <div className="mt-16 sm:mt-20">
                <div className="space-y-20">
                    <Entry title="July 26, 2022">
                        <Detail title="New Blog (on NextJS)">
                            Decided to resume blogging and set-up a new blog based on a Prezly newsroom. <Link href="https://www.lifelog.be/new-blog-theme" className="hyperlink">Read the blog post</Link>.
                        </Detail>
                    </Entry>
                </div>
            </div>
        </Container>
    );
}
