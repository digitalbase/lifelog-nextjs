import Link from 'next/link';
import type { ReactNode } from 'react';

import { Card } from '@/components/TailwindSpotlight/Card';
import { Container } from '@/components/TailwindSpotlight/Container';
import { Section } from '@/components/TailwindSpotlight/Section';

interface ToolSectionProps {
    title: string;
    children: ReactNode;
}

export const metadata = {
    title: 'Software and Hardware I use',
    description:
        'This page is an overview off all the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating.',
};

function ToolsSection({ children, ...props }: ToolSectionProps) {
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

function Tool({ title, href, children }: ToolProps) {
    return (
        <Card>
            <Card.Title slug={href ?? ''}>{title}</Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

export default function Topics() {
    return (
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
                        <Tool title="Apple Studio Display">
                            After spending years looking for the perfect display (which doesn't exist)
                            I finally caved and got myself an Apple Studio Display. I've even been getting compliments about the quality of the camera.
                            <br />
                            <br />
                            It's expensive but in my opinion it's the best monitor out there in terms of
                            all aspects of the experience (Audio, Pixel Density, Connectivity, Brightness).
                        </Tool>
                        <Tool title="Herman Miller Aeron Chair">
                            If I’m going to slouch in the worst ergonomic position imaginable all
                            day, I might as well do it in an expensive chair.
                            <br />
                            <br />
                            No seriously, it's the same chair we use in the Prezly office and I'm
                            used to switching between an active and passive position.
                        </Tool>
                        <Tool title="Apple Magic Keyboard">
                            I'm using a dark version with a Numeric Keybpad but without Touch ID.
                            Tried a mechanical keyboard and liked the feel, but couldn't get over
                            the noise.
                        </Tool>
                        <Tool title="Logitech MX Master 4">
                            Upgraded lately only for the USB connection as it was the only device
                            still using a micro USB connection. The MX Master 4 has USB-C.

                            I'm also carrying a Logitech everyday in my laptop
                            bag.
                        </Tool>
                        <Tool title="Peak Design Everyday Backpack">
                            Best backpack I could find. I would like a little more room to deal with
                            cables chargers as the side pockets are a little too small.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Development tools">
                        <Tool title="PhpStorm">
                            I never jumped on the VSCode bandwagon although the majority of the work
                            I do now is Typescript/JS stuff. After years of using this IDE I come to
                            know it inside out.
                            <br />
                            <br />
                            Within PHPStorm I use Material Oceanic theme, the Git and Database
                            integrations and lately I've been trying to use the terminal window so I
                            don't have to Alt-TAB while in focus mode.
                        </Tool>
                        <Tool title="iTerm2">
                            I’m honestly not even sure what features I get with this that aren’t
                            just part of the macOS Terminal but it’s what I use.
                        </Tool>

                        <Tool title="Linear">
                            Since we switched to Linear we haven't looked back. We tried Asana,
                            Clubhouse, Trello, Jira, and every other Project Management on the
                            planet including self hosting Redmine. Linear is simple, fast,
                            beautifully designed and has offline syncing. And it has the right
                            amount of features!
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Productivity">
                        <Tool title="Hyperkey">
                            <Link
                                href="https://hyperkey.app/"
                                className="hyperlink"
                            >
                                Hyperkey
                            </Link>{' '} is a concept where you remap your caps-lock key (which is hardly used) to a hyper key
                            <br />
                            <br />
                            This Hyperkey can then be used for all kind of mapping purposes. I use it to open Apps Hyper + L = Linear, Hyper + S = Slack, ...{' '}
                        </Tool>
                        <Tool title="Velja">
                            A mini-app that <Link className="hyperlink" href="https://apps.apple.com/us/app/velja/id1607635845?mt=12"> opens links in the right app</Link>.
                            You set it as your default browser and it will ensure that Linear links open in the Linear app. It can do that for Slack, Figma, Discord, Zoom, ...
                        </Tool>
                        <Tool title="Brew">
                            Most of the tools I install are automated using Brew and Brew Cask. I
                            keep some shell scripts around and sync them to GitHub so I don't
                            forget. It could/should have more maintenance though.
                        </Tool>

                        <Tool title="Focus">
                            I use <Link className="hyperlink" href="https://heyfocus.com/?utm_source=focus_about">this little app to block sites like YouTube, X, Chess.com during the day
                            which unblock at will.
                        </Link>
                        </Tool>



                        <Tool title="Raycast">
                            Switched to Raycast after being an Alfred fan for years. I have a Raycast PRO
                            subscription which I mostly use to sync preferences, have an extensive clipboard
                            history and writing assistance (AI).
                            <br/>
                            <br/>
                            My most used keywords are Hyper+[key] to switch to a window. Hyper+P for PhpStorm, Hyper+T Terminal, Hyper+U Upnote.
                            Recently i also migrated the window positioning to raycast after having that configuration be in BTT for the last years.

                            <br/>
                            <br/>
                            I also use <Link href="https://twitter.com/digitalbase/status/1668913346656227328"
                                             className="hyperlink">Raycast to make my browser do stuff</Link> like
                            autocompleting websites and passwords
                            (1Password), switching spaces or doing searches on Github, DuckDuckGo, Twitter or Stack
                            Overflow.
                            <br/>
                            <br/>
                            Additionally I have some custom workflows like focus mode (turn off
                            sounds, notifications, distracting apps) or tiling/positioning different
                            windows based on some presets (development, customer support, Formula

                        </Tool>
                        <Tool title="UpNote">
                            After using Bear.app for a few years I switched to Upnote mainly because
                            of Mobile Device syncing. I need my notes to be available offline on an
                            Android device. Since I'm using it I notice how much better organised my
                            notes are in the different collections.
                            <br />
                            <br />
                            The only thing i miss with UpNote is a Raycast integration but i might create it one day.
                        </Tool>
                        <Tool title="Notion">
                            As a Company we use Notion as our internal knowledge base. It has a Team
                            directory, and is a write-up of pretty much how the company works.
                            <br />
                            <br />
                            Because the company pitches are written in Notion (
                            <Link href="/multiple-product-teams" className="hyperlink">
                                we started with the Shape-Up method a few months back
                            </Link>
                            ) I find myself spending at least 30% of my time in notion.
                        </Tool>
                    </ToolsSection>
                </div>
            </div>
            <footer className="max-w-2xl mt-16">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                    Prezly tools & resources.
                </h2>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    At my company we're trying to use our own platform for internal and external
                    communication. I published a post about '
                    <Link href="/how-prezly-uses-prezly-to-run-prezly" className="hyperlink">
                        How Prezly uses Prezly to run Prezly
                    </Link>
                    ' a year ago.
                </p>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    Additionally we're using a ton of other tools to support out work. I wrote a
                    reddit post '
                    <Link
                        href="https://www.reddit.com/r/SaaS/comments/o19xcj/the_cost_to_run_my_saas/"
                        className="hyperlink"
                    >
                        The cost to run my SaaS
                    </Link>
                    ' a while back on the different tools we use and the cost of each. The post
                    ended up being the all-time /r/SaaS most favourite post 💯 so I ended up{' '}
                    <Link
                        href="/the-cost-to-run-a-saas-with-a-few-million--arr"
                        className="hyperlink"
                    >
                        posting it on the blog too
                    </Link>
                    .
                </p>
            </footer>
        </Container>
    );
}
