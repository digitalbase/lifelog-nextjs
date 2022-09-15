import type {HomePageProps} from '@prezly/theme-kit-nextjs';
import {getHomepageStaticProps} from '@prezly/theme-kit-nextjs';
import Link from 'next/link';
import type {FunctionComponent, ReactNode} from 'react';

import {Container} from '@/components/TailwindSpotlight/Container';
import Layout from '@/modules/Layout';
import {importMessages, isTrackingEnabled, loadFeaturedStories} from '@/utils';
import type {BasePageProps, StoryWithImage} from 'types';
import {Section} from '@/components/TailwindSpotlight/Section';
import {Card} from '@/components/TailwindSpotlight/Card';

type Props = BasePageProps & HomePageProps<StoryWithImage>;

interface ToolSectionProps {
    title: string;
    children: ReactNode;
}

function ToolsSection({children, ...props}: ToolSectionProps) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}

interface ToolProps {
    title: string;
    href?: string;
    children: ReactNode;
}

function Tool({title, href, children}: ToolProps) {
    return (
        <Card>
            <Card.Title href={href}>{title}</Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

const UsesPage: FunctionComponent<Props> = ({}) => (
    <Layout title="Uses.tech">
        <Container className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    Software I use, my workstation, and other things I recommend.
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    This page is an overview off all the things I use to build software, stay
                    productive, or buy to fool myself into thinking I’m being productive when I’m
                    really just procrastinating.
                </p>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    It is inspired by{' '}
                    <Link href="https://uses.tech/" className="hyperlink">
                        uses.tech
                    </Link>{' '}
                    which is a directory (made by{' '}
                    <Link href="https://wesbos.com/uses" className="hyperlink">
                        @wesbos
                    </Link>
                    ) of people sharing specifics about the hardware/software they use.
                </p>
            </header>
            <div className="mt-16 sm:mt-20">
                <div className="space-y-20">
                    <ToolsSection title="Workstation">
                        <Tool title="14” MacBook Pro, M1 Max, 32GB RAM (2021)">
                            I was using an Intel-based 15” MacBook Pro prior to this and the
                            difference is night and day. I’ve never heard the fans turn on a single
                            time, the battery time is amazing.
                        </Tool>
                        <Tool title="Dell U3821DW">
                            This is a 38 inch UltraSharp Curved USB-C Hub monitor with built in KVM.
                            It's running at WQHD+ 3840x1600 at 60Hz. It's mounted on a Ergotron HX
                            mount (VESA) which makes it super easy to move.
                        </Tool>
                        <Tool title="Herman Miller Aeron Chair">
                            If I’m going to slouch in the worst ergonomic position imaginable all
                            day, I might as well do it in an expensive chair.
                        </Tool>
                        <Tool title="Jean Prouve compas direction desk">
                            It's a pretty small desk (60x140cm) but it looks great. The wood top is
                            made from oak with a natural finish and feels great. No mouse-pad
                        </Tool>
                        <Tool title="Apple Magic Keyboard">
                            I'm using a dark version with a Numeric Keybpad but without Touch ID
                        </Tool>
                        <Tool title="Logitech MX Master 2">
                            Favourite mouse although I'm carrying a Logitech everyday in my laptop
                            bag.
                        </Tool>
                        <Tool title="Logitech C920">
                            As the laptop is almost always closed I need an external camera. This
                            camera can do Full HD video (1080p at 30fps). I'm considering{' '}
                            <Link
                                href="https://ma.tt/2020/05/ceo-video-streaming/"
                                className="hyperlink"
                            >
                                upgrading my video setup
                            </Link>{' '}
                            at some point.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Development tools">
                        <Tool title="Sublime Text 4">
                            I don’t care if it’s missing all of the fancy IDE features everyone else
                            relies on, Sublime Text is still the best text editor ever made.
                        </Tool>
                        <Tool title="iTerm2">
                            I’m honestly not even sure what features I get with this that aren’t
                            just part of the macOS Terminal but it’s what I use.
                        </Tool>
                        <Tool title="TablePlus">
                            Great software for working with databases. Has saved me from building
                            about a thousand admin interfaces for my various projects over the
                            years.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Productivity">
                        <Tool title="Alfred">
                            It’s not the newest kid on the block but it’s still the fastest. The
                            Sublime Text of the application launcher world.
                        </Tool>
                        <Tool title="Reflect">
                            Using a daily notes system instead of trying to keep things organized by
                            topics has been super powerful for me. And with Reflect, it’s still easy
                            for me to keep all of that stuff discoverable by topic even though all
                            of my writing happens in the daily note.
                        </Tool>
                        <Tool title="SavvyCal">
                            Great tool for scheduling meetings while protecting my calendar and
                            making sure I still have lots of time for deep work during the week.
                        </Tool>
                        <Tool title="Focus">
                            Simple tool for blocking distracting websites when I need to just do the
                            work and get some momentum going.
                        </Tool>
                    </ToolsSection>
                </div>
            </div>
        </Container>
    </Layout>
);

export const getStaticProps = getHomepageStaticProps<BasePageProps, StoryWithImage>(
    async (context, {newsroomContextProps}) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
        featuredStories: await loadFeaturedStories(context),
    }),
);

export default UsesPage;
